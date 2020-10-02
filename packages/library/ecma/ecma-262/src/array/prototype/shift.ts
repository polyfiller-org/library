import {ToObject} from "../../abstract-operation/to-object";
import {Set} from "../../abstract-operation/set";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {assert} from "../../abstract-operation/assert";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
import {HasProperty} from "../../abstract-operation/has-property";
/**
 * https://tc39.es/ecma262/#sec-array.prototype.shift
 */
export const {shift: arrayPrototypeShift} = {
	shift<T>(this: T[]): T | undefined {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If len is zero, then
		if (len === 0) {
			// Perform ? Set(O, "length", 0, true).
			Set(O, "length", 0, true);

			// Return undefined.
			return undefined;
		}

		// Let first be ? Get(O, "0").
		const first = Get(O, "0");

		// Let k be 1.
		let k = 1;

		// Repeat, while k < len
		while (k < len) {
			// Let from be ! ToString(k).
			const from = ToString(k);

			// Let to be ! ToString(k - 1).
			const to = ToString(k - 1);

			// Let fromPresent be ? HasProperty(O, from).
			const fromPresent = HasProperty(O, from);

			// If fromPresent is true, then
			if (fromPresent === true) {
				// Let fromVal be ? Get(O, from).
				const fromVal = Get(O, from);

				// Perform ? Set(O, to, fromVal, true).
				Set(O, to, fromVal, true);
			}

			// Else,
			else {
				// Assert: fromPresent is false.
				assert(fromPresent === false);

				// Perform ? DeletePropertyOrThrow(O, to).
				DeletePropertyOrThrow(O, to);
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Perform ? DeletePropertyOrThrow(O, ! ToString(len - 1)).
		DeletePropertyOrThrow(O, ToString(len - 1));

		// Perform ? Set(O, "length", len - 1, true).
		Set(O, "length", len - 1, true);

		// Return first.
		return first;
	}
};
