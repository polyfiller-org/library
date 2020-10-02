import {SameValue} from "./same-value";
import {IsInteger} from "./is-integer";
import {MATH_2_TO_THE_POWER_OF_32_MINUS_1} from "../constant/math-constant";

/**
 * An array index is an integer index whose numeric value i is in the range +0 ≤ i < 232 - 1.
 * https://tc39.es/ecma262/#array-index
 * @param {T} argument
 * @return {argument is T}
 */
export function IsArrayIndex<T extends number>(argument: T): argument is T;
export function IsArrayIndex(argument: unknown): argument is number;
export function IsArrayIndex(argument: unknown): argument is number {
	if (!IsInteger(argument)) {
		return false;
	}

	if (argument < 0 || SameValue(argument, -0)) return false;
	return argument < MATH_2_TO_THE_POWER_OF_32_MINUS_1;
}
