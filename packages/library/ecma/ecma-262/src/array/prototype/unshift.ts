import {ToObject} from "../../abstract-operation/to-object";
import {Get} from "../../abstract-operation/get";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {Set} from "../../abstract-operation/set";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {assert} from "../../abstract-operation/assert";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../../constant/math-constant";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.unshift
 */
export const {unshift: arrayPrototypeUnshift} = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	unshift<T>(this: T[], _item: T): number {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// Let argCount be the number of actual arguments.
		const argCount = arguments.length;

		// If argCount > 0, then
		if (argCount > 0) {
			// If len + argCount > 2^53 - 1, throw a TypeError exception.
			if (len + argCount > MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
				throw new TypeError();
			}

			// Let k be len.
			let k = len;

			// Repeat, while k > 0,
			while (k > 0) {
				// Let from be ! ToString(k - 1).
				const from = ToString(k - 1);

				// Let to be ! ToString(k + argCount - 1).
				const to = ToString(k + argCount - 1);

				// Let fromPresent be ? HasProperty(O, from).
				const fromPresent = HasProperty(O, from);

				// If fromPresent is true, then
				if (fromPresent === true) {
					// Let fromValue be ? Get(O, from).
					const fromValue = Get(O, from);

					// Perform ? Set(O, to, fromValue, true).
					Set(O, to, fromValue, true);
				}

				// Else,
				else {
					// Assert: fromPresent is false.
					assert(fromPresent === false);

					// Perform ? DeletePropertyOrThrow(O, to).
					DeletePropertyOrThrow(O, to);
				}

				// Set k to k - 1.
				k = k - 1;
			}

			// Let j be 0.
			let j = 0;

			// Let items be a List whose elements are, in left to right order, the arguments that were passed to this function invocation.
			const items = arguments;

			// Repeat, while items is not empty
			while (items.length > 0) {
				// Remove the first element from items and let E be the value of that element.
				const E = Array.prototype.shift.call(items);

				// Perform ? Set(O, ! ToString(j), E, true).
				Set(O, ToString(j), E, true);

				// Set j to j + 1.
				j = j + 1;
			}
		}

		// Perform ? Set(O, "length", len + argCount, true).
		Set(O, "length", len + argCount, true);

		// Return len + argCount.
		return len + argCount;
	}
};
