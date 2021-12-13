import svelte from "rollup-plugin-svelte";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import livereload from "rollup-plugin-livereload";
import {terser} from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "rollup-plugin-ts";

const production = !Boolean(process.env.ROLLUP_WATCH);

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

export default {
	input: "src/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
			emitCss: false,
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file - better for performance
				css: css => {
					css.write("bundle.css");
				}
			}
		}),
		json({
			preferConst: true
		}),
		image(),
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		commonjs(),
		typescript({
			transpiler: "babel",
			exclude: ["**/*.css"],
			browserslist: ["IE 11"]
		}),
		!production && serve(),
		!production && livereload("public"),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
