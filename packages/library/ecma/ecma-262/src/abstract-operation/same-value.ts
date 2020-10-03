import {SameValueNonNumber} from "./same-value-non-number";
import {Type} from "./type";

/**
 * The internal comparison abstract operation SameValue(x, y), where x and y are ECMAScript language values, produces true or false.
 *
 * https://tc39.github.io/ecma262/#sec-samevalue
 */
export function SameValue(x: unknown, y: unknown): boolean {
	// If Type(x) is different from Type(y), return false.
	if (Type(x) !== Type(y)) {
		return false;
	}

	// If Type(x) is Number, then
	if (Type(x) === "Number") {
		// If x is NaN and y is NaN, return true.
		if (isNaN(x as number) && isNaN(y as number)) return true;

		// If x is +0 and y is -0, return false.
		// Note: When we divide 1 over +0, we get positive infinity, but when we divide 1 over -0, we get negative infinity.
		// So, this is how we achieve a way to compare +0 with -0
		if (x === 0 && y === 0 && ((1 / (x as number) === +Infinity && 1 / (y as number) === -Infinity) || (1 / (x as number) === -Infinity && 1 / (y as number) === +Infinity))) {
			return false;
		}

		// If x is the same Number value as y, return true.
		if (x === y) return true;

		// Return false.
		return false;
	}
	// Return SameValueNonNumber(x, y).
	return SameValueNonNumber(x, y);
}
