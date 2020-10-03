import {ToNumber} from "./to-number";
import {SameValue} from "./same-value";
import {modulo} from "../util/modulo";
import {MATH_2_TO_THE_POWER_OF_7, MATH_2_TO_THE_POWER_OF_8} from "../constant/math-constant";

/**
 * The abstract operation ToInt8 converts argument to one of 28 integer values in the
 * range -128 through 127, inclusive.
 * https://tc39.es/ecma262/#sec-toint8
 */
export function ToInt8(argument: unknown): number {
	// Let number be ? ToNumber(argument).
	const number = ToNumber(argument);

	// If number is NaN, +0, -0, +∞, or -∞, return +0.
	if (SameValue(number, NaN) || SameValue(number, +0) || SameValue(number, -0) || SameValue(number, +Infinity) || SameValue(number, -Infinity)) {
		return +0;
	}
	// Let int be the Number value that is the same sign as number and whose magnitude is floor(abs(number)).
	// Note: We can use Math.floor and Math.abs directly since these are part of ES3.
	const sign = number < 0 ? -1 : 1;
	const int = sign * Math.floor(Math.abs(number));

	// Let int8bit be int modulo 2^8.
	const int8bit = modulo(int, MATH_2_TO_THE_POWER_OF_8);
	// If int8bit ≥ 2^7, return int8bit - 2^8; otherwise return int8bit.
	return int8bit >= MATH_2_TO_THE_POWER_OF_7 ? int8bit - MATH_2_TO_THE_POWER_OF_8 : int8bit;
}
