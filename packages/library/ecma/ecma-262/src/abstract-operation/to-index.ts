import {ToLength} from "./to-length";
import {SameValueZero} from "./same-value-zero";
import {ToInteger} from "./to-integer";

/**
 * The abstract operation ToIndex returns value argument converted to a numeric value if it is a
 * valid integer index value. This abstract operation functions as follows:
 * https://tc39.github.io/ecma262/#sec-toindex
 * @param {*} value
 * @returns {number}
 */
export function ToIndex(value: unknown): number {
	let index: number;

	// If value is undefined, then
	if (value === undefined) {
		// Let index be 0.
		index = 0;
	}

	// Else,
	else {
		// Let integerIndex be ? ToInteger(value).
		const integerIndex = ToInteger(value);

		// If integerIndex < 0, throw a RangeError exception.
		if (integerIndex < 0) {
			throw new RangeError(`Integer: ${integerIndex} must be equal to or greater than 0`);
		}

		// Let index be ! ToLength(integerIndex).
		index = ToLength(integerIndex);

		// If SameValueZero(integerIndex, index) is false, throw a RangeError exception.
		if (!SameValueZero(integerIndex, index)) {
			throw new RangeError(`integerIndex: ${integerIndex} and index: ${index} must be equal!`);
		}
	}

	// Return index.
	return index;
}
