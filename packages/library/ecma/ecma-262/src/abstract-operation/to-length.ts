import {ToInteger} from "./to-integer";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../constant/math-constant";

/**
 * The abstract operation ToLength converts argument to an integer suitable for use as the length of an array-like object. It performs the following steps:
 * https://tc39.github.io/ecma262/#sec-tolength
 * @param {*} argument
 * @returns {number}
 */
export function ToLength(argument: unknown): number {
	// Let len be ? ToInteger(argument).
	const len = ToInteger(argument);

	// If len ≤ +0, return +0.
	if (len <= +0) return +0;

	// Return min(len, 2^53 - 1).
	// Note: Math.min is part of ES3 and thus supported
	return Math.min(len, MATH_2_TO_THE_POWER_OF_53_MINUS_1);
}
