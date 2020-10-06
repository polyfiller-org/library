import {PreRenderedChunk, RollupOptions} from "rollup";
import {CompilerOptions, ScriptTarget} from "typescript";
import {generateRollupOptions, PolyfillablePackage, SimplifiedRollupOptionsDir, SimplifiedRollupOptionsFile} from "./shared";
import {parse} from "path";
import {createHash} from "crypto";

const getGenerateChunkFileNameCallback = (ext: string, suffix = "", hashMaxLength = 12) => (chunkInfo: PreRenderedChunk): string => {
	const moduleNames = Object.keys(chunkInfo.modules).join(",");
	let hash = createHash("sha1")
		.update(moduleNames)
		.digest("hex");
	if (hash.length > hashMaxLength) {
		hash = hash.slice(0, hashMaxLength);
	}
	return `chunk/${chunkInfo.name}-${hash}${suffix}${ext}`;
}

export function generatePolyfillConfig(options: {context?: string; pkg: Partial<PolyfillablePackage>}): RollupOptions[] {
	const {pkg, context = "window"} = options;

	if (pkg.polyfills == null) return [];

	const fileRollupOptions: SimplifiedRollupOptionsFile[] = [];
	let esmRollupOptions: SimplifiedRollupOptionsDir | undefined;

	for (const {input, output} of Object.values(pkg.polyfills ?? {})) {
		const baseOptions = {
			context,
			preserveEntrySignatures: "strict"
		} as const;

		if (output.bundle != null) {
			const bundleBaseOptions = {
				...baseOptions,
				input,
				flatten: true,
				tsconfig: (tsconfig: CompilerOptions) => ({...tsconfig, target: ScriptTarget.ES5, declaration: false})
			} as const;

			if (output.bundle.standard != null || output.bundle.minified != null) {
				fileRollupOptions.push({
					...bundleBaseOptions,
					outputs: [
						...(output.bundle.standard == null
							? []
							: [
									{
										file: output.bundle.standard,
										format: "iife" as const,
										minify: false
									}
							  ]),
						...(output.bundle.minified == null
							? []
							: [
									{
										file: output.bundle.minified,
										format: "iife" as const,
										minify: true
									}
							  ])
					]
				});
			}
		}

		if (output.esm != null) {
			const parsedEsmStandardOutput = output.esm.standard == null ? undefined : parse(output.esm.standard);
			const parsedEsmMinifiedOutput = output.esm.minified == null ? undefined : parse(output.esm.minified);

			const minifiedEsmSuffix =
				parsedEsmStandardOutput == null || parsedEsmMinifiedOutput == null
					? ""
					: parsedEsmMinifiedOutput.name.replace(parsedEsmStandardOutput.name, "").replace(parsedEsmStandardOutput.ext, "").replace(parsedEsmMinifiedOutput.ext, "");

			if (esmRollupOptions == null) {
				esmRollupOptions = {
					...baseOptions,
					input: {},
					flatten: false,
					tsconfig: (tsconfig: CompilerOptions) => ({...tsconfig, target: ScriptTarget.ES2018, declaration: false}),
					outputs: []
				};
			}

			if (parsedEsmStandardOutput != null) {
				const {name, dir} = parsedEsmStandardOutput;

				esmRollupOptions.input[name] = input;
				const standardOutput = esmRollupOptions.outputs.find(({minify}) => minify == null || !minify);
				if (standardOutput == null) {
					esmRollupOptions.outputs.push({
						dir,
						format: "esm" as const,
						minify: false,
						chunkFileNames: getGenerateChunkFileNameCallback(parsedEsmStandardOutput.ext),
						entryFileNames: `[name]${parsedEsmStandardOutput.ext}`
					});
				}
			}

			if (parsedEsmMinifiedOutput != null) {
				const {name, dir} = parsedEsmMinifiedOutput;

				// Only add it to the input if there is no standard variant
				if (parsedEsmStandardOutput == null) {
					esmRollupOptions.input[name] = input;
				}

				const minifiedOutput = esmRollupOptions.outputs.find(({minify}) => minify);
				if (minifiedOutput == null) {
					esmRollupOptions.outputs.push({
						dir,
						format: "esm" as const,
						minify: true,
						chunkFileNames: getGenerateChunkFileNameCallback(parsedEsmMinifiedOutput.ext, minifiedEsmSuffix),
						entryFileNames: `[name]${minifiedEsmSuffix}${parsedEsmMinifiedOutput.ext}`
					});
				}
			}
		}
	}

	return generateRollupOptions([...fileRollupOptions, ...(esmRollupOptions == null ? [] : [esmRollupOptions])], pkg);
}
