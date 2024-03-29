import {ModuleFormat, OutputOptions, RollupOptions} from "rollup";
import {CompilerOptions} from "typescript";
import ts, {TypescriptPluginOptions} from "rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import builtinModules from "module";

export interface DependencyPackage {
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	peerDependencies: Record<string, string>;
	optionalDependencies: Record<string, string>;
}

export interface LibraryPackage extends DependencyPackage {
	main: string;
	module: string;
}

export interface PolyfillsFieldEntryValue {
	standard: string;
	minified: string;
}

export interface PolyfillsFieldEntry {
	input: string;
	output: Partial<{
		esm: Partial<PolyfillsFieldEntryValue>;
		bundle: Partial<PolyfillsFieldEntryValue>;
	}>;
}

export type PolyfillsField = Record<string, PolyfillsFieldEntry>;

export interface PolyfillablePackage extends DependencyPackage {
	polyfills: PolyfillsField;
}

export interface SimplifiedRollupOptionsBase {
	flatten: boolean;
	context?: string;
	preserveEntrySignatures?: RollupOptions["preserveEntrySignatures"];
	tsconfig?: (tsconfig: CompilerOptions) => CompilerOptions;
	hook?: TypescriptPluginOptions["hook"];
}

export interface SimplifiedRollupOptionsOutputBase {
	format: ModuleFormat;
	minify?: boolean;
	sourcemap?: boolean;
	chunkFileNames?: OutputOptions["chunkFileNames"];
	entryFileNames?: string;
}

export interface SimplifiedRollupOptionsFileOutput extends SimplifiedRollupOptionsOutputBase {
	file: string;
}

export interface SimplifiedRollupOptionsDirOutput extends SimplifiedRollupOptionsOutputBase {
	dir: string;
}

export interface SimplifiedRollupOptionsFile extends SimplifiedRollupOptionsBase {
	input: string;
	outputs: SimplifiedRollupOptionsFileOutput[];
}

export interface SimplifiedRollupOptionsDir extends SimplifiedRollupOptionsBase {
	input: Record<string, string>;
	outputs: SimplifiedRollupOptionsDirOutput[];
}

export type SimplifiedRollupOptions = SimplifiedRollupOptionsFile | SimplifiedRollupOptionsDir;

export function generateRollupOptions(
	options: SimplifiedRollupOptions[],
	{dependencies = {}, devDependencies = {}, optionalDependencies = {}, peerDependencies = {}}: Partial<DependencyPackage>
): RollupOptions[] {
	const allDependencies = [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(peerDependencies), ...Object.keys(optionalDependencies)];
	const filteredAllDependencies = allDependencies.filter(dep => !dep.startsWith("@polyfiller/"));

	return options.map(({input, preserveEntrySignatures, flatten, outputs, tsconfig, context, hook}) => ({
		input,
		output: (outputs as (SimplifiedRollupOptionsDirOutput & SimplifiedRollupOptionsFileOutput)[]).map(
			({format, minify = false, sourcemap = true, chunkFileNames, entryFileNames, ...rest}) => ({
				...("file" in rest
					? {
							file: rest.file
					  }
					: {}),
				...("dir" in rest
					? {
							dir: rest.dir
					  }
					: {}),
				format,
				sourcemap,
				chunkFileNames,
				entryFileNames,
				generatedCode: format === "iife" ? "es5" : "es2015",
				hoistTransitiveImports: false,
				compact: minify,
				minifyInternalExports: minify,
				preferConst: format !== "iife",
				plugins: [...(!minify ? [] : [terser()])]
			})
		),
		context,
		preserveEntrySignatures,
		treeshake: true,
		plugins: [
			ts({
				transpiler: "babel",
				tsconfig,
				hook
			}),
			resolve()
		],
		external: [...builtinModules.builtinModules, ...(flatten ? [] : filteredAllDependencies)]
	}));
}
