import {RollupOptions} from "rollup";
import {generateRollupOptions, LibraryPackage, SimplifiedRollupOptions} from "./shared";

export function generateLibraryConfig(options: {
	context?: string;
	input: string;
	pkg: Partial<LibraryPackage>;
}): RollupOptions[] {
	const {pkg, input, context = "window"} = options;

	const rollupOptions: SimplifiedRollupOptions[] = [];

	const baseOptions = {
		input,
		minify: false,
		flatten: false,
		context
	} as const;

	if (pkg.main != null) {
		rollupOptions.push({
			...baseOptions,
			output: pkg.main,
			format: "cjs"
		});
	}

	if (pkg.module != null) {
		rollupOptions.push({
			...baseOptions,
			output: pkg.module,
			format: "esm"
		});
	}

	return generateRollupOptions(rollupOptions, pkg);
}
