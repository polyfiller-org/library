import {ModuleFormat, RollupOptions} from "rollup";
import {CompilerOptions} from "typescript";
import ts, {TypescriptPluginOptions} from "@wessberg/rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

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
	context: string;
	tsconfig?: (tsconfig: CompilerOptions) => CompilerOptions;
	hook?: TypescriptPluginOptions["hook"];
}

export interface SimplifiedRollupOptionsFile extends SimplifiedRollupOptionsBase {
	input: string;
	outputs: {
		format: ModuleFormat;
		output: string;
		minify: boolean;
		chunkFileNames?: string;
		entryFileNames?: string;
	}[];
}

export interface SimplifiedRollupOptionsDir extends SimplifiedRollupOptionsBase {
	input: Record<string, string>;
	outputs: {
		format: ModuleFormat;
		dir: string;
		minify: boolean;
		chunkFileNames?: string;
		entryFileNames?: string;
	}[];
}

export type SimplifiedRollupOptions = SimplifiedRollupOptionsFile | SimplifiedRollupOptionsDir;

export function generateRollupOptions(
	options: SimplifiedRollupOptions[],
	{dependencies = {}, devDependencies = {}, optionalDependencies = {}, peerDependencies = {}}: Partial<DependencyPackage>
): RollupOptions[] {
	return options.map(({input, flatten, outputs, tsconfig, context, hook}) => ({
		input,
		output: (outputs as {
			format: ModuleFormat;
			dir?: string;
			output?: string;
			chunkFileNames?: string;
			entryFileNames?: string;
			minify: boolean;
		}[]).map(({format, minify, chunkFileNames, entryFileNames, ...rest}) => ({
			...("output" in rest
				? {
						file: rest.output
				  }
				: {}),
			...("dir" in rest
				? {
						dir: rest.dir
				  }
				: {}),
			format,
			chunkFileNames,
			entryFileNames,
			sourcemap: true,
			plugins: [...(!minify ? [] : [terser()])]
		})),
		context,
		treeshake: true,
		plugins: [
			ts({
				transpiler: "babel",
				tsconfig,
				hook
			}),
			resolve()
		],
		external: [...(flatten ? [] : [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(peerDependencies), ...Object.keys(optionalDependencies)])]
	}));
}
