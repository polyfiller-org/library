import {generateRollupOptions} from "@polyfiller/build";
import pkg from "./package.json";

export default generateRollupOptions(
	[
		{
			input: "src/polyfill/force.ts",
			flatten: true,
			outputs: [
				{
					file: pkg.test262.prelude,
					format: "iife",
					sourcemap: false
				}
			],
			tsconfig: resolvedOptions => ({...resolvedOptions, declaration: false})
		}
	],
	pkg
);
