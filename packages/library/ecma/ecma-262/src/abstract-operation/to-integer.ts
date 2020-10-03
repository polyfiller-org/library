import {ToNumber} from "./to-number";
import {SameValue} from "./same-value";

/**
 * The abstract operation ToInteger converts argument to an integral numeric value. This abstract operation functions as follows:
 * https://tc39.github.io/ecma262/#sec-tointeger
 */
export function ToInteger(argument: unknown): number {
	// Let number be ? ToNumber(argument).
	const number = ToNumber(argument);

	// If number is NaN, return +0.
	if (SameValue(number, NaN)) return +0;

	// If number is +0, -0, +∞, or -∞, return number.
	if (SameValue(number, +0) || SameValue(number, -0) || SameValue(number, +Infinity) || SameValue(number, -Infinity)) {
		return number;
	}

	// Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
	// Note: We can use Math.floor and Math.abs directly since these are part of ES3.
	const sign = number < 0 ? -1 : 1;
	return sign * Math.floor(Math.abs(number));
}
