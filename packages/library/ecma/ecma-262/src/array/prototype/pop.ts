import {ToObject} from "../../abstract-operation/to-object";
import {Set} from "../../abstract-operation/set";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {assert} from "../../abstract-operation/assert";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
/**
 * https://tc39.es/ecma262/#sec-array.prototype.pop
 */
export const {pop: arrayPrototypePop} = {
	pop<T>(this: T[]): T | undefined {
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

		// Else,
		else {
			// Assert: len > 0.
			assert(len > 0);

			// Let newLen be len - 1.
			const newLen = len - 1;

			// Let index be ! ToString(newLen).
			const index = ToString(newLen);

			// Let element be ? Get(O, index).
			const element = Get(O, index);

			// Perform ? DeletePropertyOrThrow(O, index).
			DeletePropertyOrThrow(O, index);

			// Perform ? Set(O, "length", newLen, true).
			Set(O, "length", newLen, true);

			// Return element.
			return element;
		}
	}
};
