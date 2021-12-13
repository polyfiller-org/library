import {spawnSync} from "child_process";
import {resolve, isAbsolute, join, dirname} from "path";
import {promises} from "fs";
import {cpus} from "os";
import {sync} from "find-up";

export interface BaseOptions {
	prelude?: string;
	preprocessor?: string;
}

export interface GlobOptions extends BaseOptions {
	glob: string;
}

export interface RunTest262Options extends BaseOptions {
	cwd?: string;
	glob: string | (string | GlobOptions)[];
}

export interface Test262HarnessResult {
	result: {
		pass: boolean;
		message: string;
	};
	attrs: Record<string, string>;
	file: string;
}

/**
 * Runs test262 based on the given options
 */
export async function runTest262({glob, prelude, preprocessor, cwd = process.cwd()}: Partial<RunTest262Options>): Promise<void> {
	// Try to locate a package.json file
	const pkgPath = sync("package.json", {type: "file", cwd});

	if (pkgPath != null) {
		const pkg = (await import(pkgPath)) as {test262?: Partial<RunTest262Options>};

		if (pkg.test262 != null) {
			if (prelude === undefined) {
				prelude = pkg.test262.prelude;
			}

			if (preprocessor === undefined) {
				preprocessor = pkg.test262.preprocessor;
			}

			if (glob === undefined) {
				glob = pkg.test262.glob;
			}
		}
	}

	const computePath = (path: string) => (isAbsolute(path) ? path : join(cwd, path));
	const preludePath = prelude == null ? undefined : computePath(prelude);
	const test262TestDir = sync("test262/test", {type: "directory"});

	if (test262TestDir == null) {
		throw new ReferenceError(`Could not resolve test262 git submodule.`);
	}

	const preprocessorPath = preprocessor == null ? undefined : isAbsolute(preprocessor) ? preprocessor : join(cwd, preprocessor);
	const test262HarnessPkg = require.resolve("test262-harness/package.json");
	const test262HarnessPkgContent = JSON.parse(await promises.readFile(test262HarnessPkg, "utf-8"));
	const test262HarnessBin = join(dirname(test262HarnessPkg), test262HarnessPkgContent.bin["test262-harness"]);

	if (glob == null) return;

	const globs = Array.isArray(glob) ? glob : [glob];
	for (const globString of globs) {
		const currentPreludePath = typeof globString === "string" || globString.prelude == null ? preludePath : computePath(globString.prelude);
		const currentPreprocessorPath = typeof globString === "string" || globString.preprocessor == null ? preprocessorPath : computePath(globString.preprocessor);
		const currentGlob = typeof globString === "string" ? globString : globString.glob;

		const args = [
			test262HarnessBin,
			"--reporter-keys",
			"file,attrs,result",
			"-t",
			String(cpus().length),
			...(currentPreludePath == null ? [] : ["--prelude", currentPreludePath]),
			...(currentPreprocessorPath == null ? [] : ["--preprocessor", currentPreprocessorPath]),
			"--timeout",
			"650000",
			"-r",
			"json",
			`${test262TestDir}/${currentGlob}`
		];
		console.log(`Running "test262-harness ${args.join(" ")}"`);

		const result = spawnSync(`node`, args, {
			env: process.env,
			encoding: "utf-8"
		});
		if (Boolean(result.status) || result.stderr || result.error) {
			console.error(result.stderr);
			console.error(result.error);
			process.exit((result.status ?? 0) || 1);
		}

		const json = JSON.parse(result.stdout) as Test262HarnessResult[];
		const failedTests = json.filter(r => !r.result.pass);
		json.forEach(t => {
			if (t.result.pass) {
				// console.log(`✓ ${t.attrs.description}`);
			} else {
				console.log("\n\n");
				console.log(`🗴 ${t.attrs.description}`);
				console.log(`\t ${t.result.message}`);
				console.log("\t", resolve(__dirname, "..", t.file));
				console.log("\n\n");
			}
		});
		if (failedTests.length) {
			console.log(`Tests: ${failedTests.length} failed, ${json.length - failedTests.length} passed, ${json.length} total`);
			process.exit(1);
		}
		console.log(`Tests: ${json.length - failedTests.length} passed, ${json.length} total`);
	}
}
