import {Type} from "./type";
import {SameValue} from "./same-value";

/**
 * The abstract operation IsInteger determines if argument is a finite integer numeric value.
 * https://tc39.es/ecma262/#sec-isinteger
 */
export function IsInteger<T extends number>(argument: T): argument is T;
export function IsInteger(argument: unknown): argument is number;
export function IsInteger(argument: unknown): argument is number {
	// If Type(argument) is not Number, return false.
	if (Type(argument) !== "Number") return false;

	// If argument is NaN, +∞, or -∞, return false.
	if (SameValue(argument, NaN) || SameValue(argument, +Infinity) || SameValue(argument, -Infinity)) {
		return false;
	}

	// If floor(abs(argument)) ≠ abs(argument), return false.
	// Note: Math.floor and Math.abs is supported by ES3, so these are OK to use here
	if (Math.floor(Math.abs(argument as number)) !== Math.abs(argument as number)) {
		return false;
	}

	// Return true.
	return true;
}
