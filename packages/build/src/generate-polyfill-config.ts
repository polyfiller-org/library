import {RollupOptions} from "rollup";
import {CompilerOptions, ScriptTarget} from "typescript";
import {generateRollupOptions, PolyfillablePackage, SimplifiedRollupOptions} from "./shared";
import {join, parse} from "path";

export function generatePolyfillConfig(options: {context?: string; pkg: Partial<PolyfillablePackage>}): RollupOptions[] {
	const {pkg, context = "window"} = options;

	const rollupOptions: SimplifiedRollupOptions[] = [];

	for (const {input, output} of Object.values(pkg.polyfills ?? {})) {
		const baseOptions = {
			context
		} as const;

		let bestDeclarationFileNameSource = output.bundle?.standard ?? output.esm?.standard ?? output.bundle?.minified ?? output.esm?.minified;

		if (output.bundle != null) {
			const bundleBaseOptions = {
				...baseOptions,
				input,
				flatten: true,
				format: "iife",
				tsconfig: (tsconfig: CompilerOptions) => ({...tsconfig, target: ScriptTarget.ES5}),
				...(bestDeclarationFileNameSource == null
					? {}
					: {
							hook: {
								outputPath: (path: string, kind: string) => {
									if (kind !== "declaration") return path;
									const {dir, name} = parse(bestDeclarationFileNameSource!);
									return join(dir, `${name}.d.ts`);
								}
							}
					  })
			} as const;

			if (output.bundle.standard != null) {
				rollupOptions.push({
					...bundleBaseOptions,
					output: output.bundle.standard,
					minify: false
				});
			}

			if (output.bundle.minified != null) {
				rollupOptions.push({
					...bundleBaseOptions,
					output: output.bundle.minified,
					minify: true
				});
			}
		}

		if (output.esm != null) {
			const esmBaseOptions = {
				...baseOptions,
				input,
				flatten: false,
				format: "esm",
				tsconfig: (tsconfig: CompilerOptions) => ({...tsconfig, target: ScriptTarget.ES2018})
			} as const;

			if (output.esm.standard != null) {
				rollupOptions.push({
					...esmBaseOptions,
					output: output.esm.standard,
					minify: false
				});
			}

			if (output.esm.minified != null) {
				rollupOptions.push({
					...esmBaseOptions,
					output: output.esm.minified,
					minify: true
				});
			}
		}
	}

	return generateRollupOptions(rollupOptions, pkg);
}
