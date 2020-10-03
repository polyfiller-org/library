import {StringifiedIndex} from "../type/stringified-index";
import {Type} from "./type";
import {NumberToString} from "./number-to-string";
import {ToPrimitive} from "./to-primitive";
import {HINT_STRING} from "../hint/string";

/**
 * The abstract operation ToString converts argument to a value of type String
 * https://tc39.github.io/ecma262/#sec-tostring
 */
export function ToString(argument: number): StringifiedIndex;
export function ToString(argument: unknown): string;
export function ToString(argument: unknown): string {
	switch (Type(argument)) {
		case "Undefined":
			// Return "undefined".
			return "undefined";

		case "Null":
			// Return "null".
			return "null";

		case "Boolean":
			// If argument is true, return "true".
			if (argument === true) return "true";

			// If argument is false, return "false".
			return "false";

		case "Number":
			// Return NumberToString(argument).
			return NumberToString(argument as number);

		case "String":
			// Return argument.
			return argument as string;

		case "Symbol":
			// Throw a TypeError exception.
			throw new TypeError(`Cannot convert a Symbol value to a string`);

		case "Object": {
			// Let primValue be ? ToPrimitive(argument, hint String)
			const primValue = ToPrimitive(argument, HINT_STRING);

			// Return ? ToString(primValue).
			return ToString(primValue);
		}
	}
}
