import {RollupOptions} from "rollup";
import {generateRollupOptions, LibraryPackage, SimplifiedRollupOptions} from "./shared";

export function generateLibraryConfig(options: {context?: string; input: string; pkg: Partial<LibraryPackage>}): RollupOptions[] {
	const {pkg, input, context = "window"} = options;

	const rollupOptions: SimplifiedRollupOptions = {
		input,
		flatten: false,
		outputs: [],
		context
	};

	if (pkg.main != null) {
		rollupOptions.outputs.push({
			minify: false,
			output: pkg.main,
			format: "cjs"
		});
	}

	if (pkg.module != null) {
		rollupOptions.outputs.push({
			minify: false,
			output: pkg.module,
			format: "esm"
		});
	}

	return generateRollupOptions([rollupOptions], pkg);
}
