import {ToNumber} from "./to-number";
import {SameValue} from "./same-value";
import {modulo} from "../util/modulo";
import {MATH_2_TO_THE_POWER_OF_32} from "../constant/math-constant";

/**
 * The abstract operation ToUint32 converts argument to one of 2^32 integer
 * values in the range 0 through 2^32 - 1, inclusive.
 * https://tc39.es/ecma262/#sec-touint32
 * @param {*} argument
 * @returns {number}
 */
export function ToUint32(argument: unknown): number {
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

	// Let int32bit be int modulo 2^32.
	const int32bit = modulo(int, MATH_2_TO_THE_POWER_OF_32);

	// Return int32bit.
	return int32bit;
}
