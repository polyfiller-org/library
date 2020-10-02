import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToInteger} from "../../abstract-operation/to-integer";
import {assert} from "../../abstract-operation/assert";
import {Get} from "../../abstract-operation/get";
import {ToString} from "../../abstract-operation/to-string";
import {SameValueZero} from "../../abstract-operation/same-value-zero";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.includes
 */
export const {includes: arrayPrototypeIncludes} = {
	includes<T>(this: T[], searchElement: T): boolean {
		const fromIndex = arguments.length < 2 ? undefined : (arguments[1] as number | undefined);
		let k: number;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If len is 0, return false.
		if (len === 0) return false;

		// Let n be ? ToInteger(fromIndex).
		const n = ToInteger(fromIndex);

		// Assert: If fromIndex is undefined, then n is 0.
		if (fromIndex === undefined) {
			assert(n === 0);
		}

		// If n ≥ 0, then
		if (n >= 0) {
			// Let k be n.
			k = n;
		}

		// Else,
		else {
			// Let k be len + n.
			k = len + n;

			// If k < 0, set k to 0.
			if (k < 0) {
				k = 0;
			}
		}

		// Repeat, while k < len
		while (k < len) {
			// Let elementK be the result of ? Get(O, ! ToString(k)).
			const elementK = Get(O, ToString(k));

			// If SameValueZero(searchElement, elementK) is true, return true.
			if (SameValueZero(searchElement, elementK) === true) {
				return true;
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Return false.
		return false;
	}
};
