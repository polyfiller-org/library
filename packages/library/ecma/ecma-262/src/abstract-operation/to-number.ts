import {Type} from "./type";
import {ToPrimitive} from "./to-primitive";
import {HINT_NUMBER} from "../hint/number";

/**
 * The abstract operation ToNumber converts argument to a value of type Number
 * https://tc39.es/ecma262/#sec-tonumber
 */
export function ToNumber(argument: unknown): number {
	switch (Type(argument)) {
		case "Undefined":
			// 	Return NaN.
			return NaN;

		case "Null":
			// Return +0.
			return +0;

		case "Boolean":
			// If argument is true, return 1. If argument is false, return +0.
			if (argument === true) {
				return 1;
			} else {
				return +0;
			}

		case "Number":
			// Return argument (no conversion).
			return argument as number;

		case "String":
			// See grammar and conversion algorithm here: https://tc39.es/ecma262/#sec-tonumber-applied-to-the-string-type
			return Number(argument);

		case "Symbol":
			// Throw a TypeError exception.
			throw new TypeError(`Cannot convert a Symbol value to a number`);

		case "Object": {
			// Let primValue be ? ToPrimitive(argument, hint Number)
			const primValue = ToPrimitive(argument, HINT_NUMBER);

			// Return ? ToNumber(primValue).
			return ToNumber(primValue);
		}
	}
}
