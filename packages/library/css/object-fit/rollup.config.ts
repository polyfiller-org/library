import {generatePolyfillConfig, generateLibraryConfig} from "@polyfiller/build";
import pkg from "./package.json";

export default [
	...generatePolyfillConfig({pkg}),
	...generateLibraryConfig({pkg, input: "src/index.ts"})
]
