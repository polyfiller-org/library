import {ToNumber} from "./to-number";
import {SameValue} from "./same-value";

/**
 * The abstract operation ToUint8Clamp converts argument to one of 28 integer values
 * in the range 0 through 255, inclusive.
 * https://tc39.es/ecma262/#sec-touint8
 */
export function ToUint8Clamp(argument: unknown): number {
	// Let number be ? ToNumber(argument).
	const number = ToNumber(argument);

	// If number is NaN, return +0.
	if (SameValue(number, NaN)) return +0;

	// If number ≤ 0, return +0.
	if (number <= 0) return +0;

	// If number ≥ 255, return 255.
	if (number >= 255) return 255;

	// Let f be floor(number).
	// Note: We can use Math.floor directly because its from ES3
	const f = Math.floor(number);

	// If f + 0.5 < number, return f + 1.
	if (f + 0.5 < number) return f + 1;

	// If number < f + 0.5, return f.
	if (number < f + 0.5) return f;

	// If f is odd, return f + 1.
	if (f % 2 === 1) return f + 1;

	// Return f.
	return f;
}
