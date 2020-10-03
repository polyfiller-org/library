import {SameValueNonNumber} from "./same-value-non-number";
import {Type} from "./type";

/**
 * The internal comparison abstract operation SameValueZero(x, y), where x and y are ECMAScript language values, produces true or false. Such a comparison is performed as follows:
 * https://tc39.github.io/ecma262/#sec-samevaluezero
 */
export function SameValueZero(x: unknown, y: unknown): boolean {
	// If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) return false;

	// If Type(x) is Number, then
	if (Type(x) === "Number") {
		// If x is NaN and y is NaN, return true.
		if (isNaN(x as number) && isNaN(y as number)) return true;

		// If x is +0 and y is -0, return true.
		if (Object.is(x, +0) && Object.is(y, -0)) return true;

		// If x is -0 and y is +0, return true.
		if (Object.is(x, -0) && Object.is(y, +0)) return true;

		// If x is the same Number value as y, return true.
		if (x === y) return true;

		return false;
	}

	// Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}
