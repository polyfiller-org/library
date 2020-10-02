import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToInteger} from "../../abstract-operation/to-integer";
import {Get} from "../../abstract-operation/get";
import {ToString} from "../../abstract-operation/to-string";
import {SameValue} from "../../abstract-operation/same-value";
import {HasProperty} from "../../abstract-operation/has-property";
import {StrictEqualityComparison} from "../../algorithm/strict-equality-comparison";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.lastindexof
 */
export const {lastIndexOf: arrayPrototypeLastIndexOf} = {
	lastIndexOf<T>(this: T[], searchElement: T): number {
		const fromIndex = arguments.length < 2 ? undefined : (arguments[1] as number | undefined);
		const fromIndexPresent = arguments.length >= 2;

		let k: number;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// If fromIndex is present, let n be ? ToInteger(fromIndex); else let n be len - 1.
		const n = fromIndexPresent ? ToInteger(fromIndex) : len - 1;

		// If n ≥ 0, then
		if (n >= 0) {
			// If n is -0, let k be +0; else let k be min(n, len - 1).
			if (SameValue(n, -0)) {
				k = +0;
			} else {
				// Note: We can use Math.min here since its part of ES3
				k = Math.min(n, len - 1);
			}
		}

		// Else,
		else {
			// Let k be len + n.
			k = len + n;
		}

		// Repeat, while k ≥ 0
		while (k >= 0) {
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

			// Set k to k - 1.
			k = k - 1;
		}

		// Return -1.
		return -1;
	}
};
