import {Type} from "../abstract-operation/type";
import {SameValue} from "../abstract-operation/same-value";
import {SameValueNonNumber} from "../abstract-operation/same-value-non-number";

/**
 * The comparison x === y, where x and y are values, produces true or false.
 * https://tc39.es/ecma262/#sec-strict-equality-comparison
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
export function StrictEqualityComparison(x: unknown, y: unknown): boolean {
	// If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) return false;

	// If Type(x) is Number, then
	if (Type(x) === "Number") {
		// If x is NaN, return false.
		if (SameValue(x, NaN)) return false;

		// If y is NaN, return false.
		if (SameValue(y, NaN)) return false;

		// If x is the same Number value as y, return true.
		if (SameValue(x, y)) return true;

		// If x is +0 and y is -0, return true.
		if (SameValue(x, +0) && SameValue(y, -0)) return true;

		// If x is -0 and y is +0, return true.
		if (SameValue(x, -0) && SameValue(y, +0)) return true;

		// Return false.
		return false;
	}

	// Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}
