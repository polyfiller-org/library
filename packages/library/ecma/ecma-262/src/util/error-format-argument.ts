import {IsArray} from "../abstract-operation/is-array";
import {SYMBOL_LIST} from "../symbol/symbol";
import {SymbolDescriptiveString} from "../abstract-operation/symbol-descriptive-string";

/**
 * Gets an error-formatted name of the given argument
 * @param {*} object
 * @return {string}
 */
export function errorFormatArgument(object: unknown): string {
	switch (typeof object) {
		case "string":
			return object;
		case "undefined":
		case "boolean":
		case "number":
			return String(object);
		case "symbol":
			return SymbolDescriptiveString(object);
		default:
			if (object === null) return "null";

			if (IsArray(object)) {
				return "[object Array]";
			}

			if (SYMBOL_LIST.has(object as symbol)) return SymbolDescriptiveString(object as symbol);

			if (typeof object === "function") {
				return `[object Function]`;
			}

			return "#<Object>";
	}
}
