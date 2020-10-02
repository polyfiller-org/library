import {IsInteger} from "./is-integer";

/**
 * The abstract operation IsNonNegativeInteger takes argument argument.
 * It determines if argument is a non-negative integer Number value.
 * https://tc39.es/ecma262/#sec-isnonnegativeinteger
 */
export function IsNonNegativeInteger(argument: unknown): argument is number {
	// If ! IsInteger(argument) is true and argument ≥ 0, return true.
	if (IsInteger(argument) && argument >= 0) {
		return true;
	}

	// Otherwise, return false.
	return false;
}
