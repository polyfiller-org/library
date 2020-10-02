import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToInteger} from "../../abstract-operation/to-integer";
import {assert} from "../../abstract-operation/assert";
import {Get} from "../../abstract-operation/get";
import {ToString} from "../../abstract-operation/to-string";
import {SameValue} from "../../abstract-operation/same-value";
import {HasProperty} from "../../abstract-operation/has-property";
import {StrictEqualityComparison} from "../../algorithm/strict-equality-comparison";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.indexof
 */
export const {indexOf: arrayPrototypeIndexOf} = {
	indexOf<T>(this: T[], searchElement: T): number {
		const fromIndex = arguments.length < 2 ? undefined : (arguments[1] as number | undefined);
		let k: number;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If len is 0, return -1.
		if (len === 0) return -1;

		// Let n be ? ToInteger(fromIndex).
		const n = ToInteger(fromIndex);

		// Assert: If fromIndex is undefined, then n is 0.
		if (fromIndex === undefined) {
			assert(n === 0);
		}

		// If n ≥ len, return -1.
		if (n >= len) {
			return -1;
		}

		// If n ≥ 0, then
		if (n >= 0) {
			// If n is -0, let k be +0; else let k be n.
			if (SameValue(n, -0)) {
				k = +0;
			} else {
				k = n;
			}
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
			// Let kPresent be ? HasProperty(O, ! ToString(k)).
			const kPresent = HasProperty(O, ToString(k));

			// If kPresent is true, then
			if (kPresent === true) {
				// Let elementK be ? Get(O, ! ToString(k)).
				const elementK = Get(O, ToString(k));

				// Let same be the result of performing Strict Equality Comparison searchElement === elementK.
				const same = StrictEqualityComparison(searchElement, elementK);

				// If same is true, return k.
				if (same === true) {
					return k;
				}
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Return -1.
		return -1;
	}
};
