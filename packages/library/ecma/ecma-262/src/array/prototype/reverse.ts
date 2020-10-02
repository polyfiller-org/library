import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {Set} from "../../abstract-operation/set";
import {HasProperty} from "../../abstract-operation/has-property";
import {Get} from "../../abstract-operation/get";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
import {assert} from "../../abstract-operation/assert";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.reverse
 */
export const {reverse: arrayPrototypeReverse} = {
	reverse<T>(this: T[]): T[] {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// Let middle be floor(len / 2).
		// Note that Math.floor is part of ES3 so we can use it here
		const middle = Math.floor(len / 2);

		// Let lower be 0.
		let lower = 0;

		// Repeat, while lower ≠ middle
		while (lower !== middle) {
			let lowerValue: T | undefined;
			let upperValue: T | undefined;

			// Let upper be len - lower - 1.
			const upper = len - lower - 1;

			// Let upperP be ! ToString(upper).
			const upperP = ToString(upper);

			// Let lowerP be ! ToString(lower).
			const lowerP = ToString(lower);

			// Let lowerExists be ? HasProperty(O, lowerP).
			const lowerExists = HasProperty(O, lowerP);

			// If lowerExists is true, then
			if (lowerExists === true) {
				// Let lowerValue be ? Get(O, lowerP).
				lowerValue = Get(O, lowerP);
			}

			// Let upperExists be ? HasProperty(O, upperP).
			const upperExists = HasProperty(O, upperP);

			// If upperExists is true, then
			if (upperExists === true) {
				// Let upperValue be ? Get(O, upperP).
				upperValue = Get(O, upperP);
			}

			// If lowerExists is true and upperExists is true, then
			if (lowerExists === true && upperExists === true) {
				// Perform ? Set(O, lowerP, upperValue, true).
				Set(O, lowerP, upperValue, true);

				// Perform ? Set(O, upperP, lowerValue, true).
				Set(O, upperP, lowerValue, true);
			}

			// Else if lowerExists is false and upperExists is true, then
			else if (lowerExists === false && upperExists === true) {
				// Perform ? Set(O, lowerP, upperValue, true).
				Set(O, lowerP, upperValue, true);

				// Perform ? DeletePropertyOrThrow(O, upperP).
				DeletePropertyOrThrow(O, upperP);
			}

			// Else if lowerExists is true and upperExists is false, then
			else if (lowerExists === true && upperExists === false) {
				// Perform ? DeletePropertyOrThrow(O, lowerP).
				DeletePropertyOrThrow(O, lowerP);

				// Perform ? Set(O, upperP, lowerValue, true).
				Set(O, upperP, lowerValue, true);
			}

			// Else,
			else {
				// Assert: lowerExists and upperExists are both false.
				assert(lowerExists === false && upperExists === false);
				// No action is required.
			}

			// Set lower to lower + 1.
			lower = lower + 1;
		}

		// Return O
		return O;
	}
};
