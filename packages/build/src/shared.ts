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
		bundle: Partial<PolyfillsFieldEntryValue>;
		esm: Partial<PolyfillsFieldEntryValue>;
	}>;
}

export type PolyfillsField = Record<string, PolyfillsFieldEntry>;

export interface PolyfillablePackage extends DependencyPackage {
	polyfills: PolyfillsField;
}


export interface SimplifiedRollupOptions {
	flatten: boolean;
	minify: boolean;
	input: string;
	output: string;
	format: ModuleFormat;
	context: string;
	tsconfig?: (tsconfig: CompilerOptions) => CompilerOptions;
	hook?: TypescriptPluginOptions["hook"];
}

export function generateRollupOptions(
	options: SimplifiedRollupOptions[],
	{dependencies = {}, devDependencies = {}, optionalDependencies = {}, peerDependencies = {}}: Partial<DependencyPackage>
): RollupOptions[] {
	return options.map(({input, flatten, format, minify, output, tsconfig, context, hook}) => ({
		input,
		output: [
			{
				file: output,
				format,
				sourcemap: true
			}
		],
		context,
		treeshake: true,
		plugins: [
			ts({
				transpiler: "babel",
				tsconfig,
				hook
			}),
			resolve(),
			...(minify ? [terser()] : [])
		],
		external: [...(flatten ? [] : [...Object.keys(dependencies), ...Object.keys(devDependencies), ...Object.keys(peerDependencies), ...Object.keys(optionalDependencies)])]
	}));
}
