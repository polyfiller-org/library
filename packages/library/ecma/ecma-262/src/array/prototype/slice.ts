import {ToObject} from "../../abstract-operation/to-object";
import {Set} from "../../abstract-operation/set";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {HasProperty} from "../../abstract-operation/has-property";
import {ToInteger} from "../../abstract-operation/to-integer";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.slice
 */
export const {slice: arrayPrototypeSlice} = {
	slice<T>(this: T[], start: number, end: number): T[] {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// Let relativeStart be ? ToInteger(start).
		const relativeStart = ToInteger(start);

		// If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len).
		let k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

		// If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		const relativeEnd = end === undefined ? len : ToInteger(end);

		// If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		const final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

		// Let count be max(final - k, 0).
		const count = Math.max(final - k, 0);

		// Let A be ? ArraySpeciesCreate(O, count).
		const A = ArraySpeciesCreate(O, count);

		// Let n be 0.
		let n = 0;

		// Repeat, while k < final
		while (k < final) {
			// Let Pk be ! ToString(k).
			const Pk = ToString(k);

			// Let kPresent be ? HasProperty(O, Pk).
			const kPresent = HasProperty(O, Pk);

			// If kPresent is true, then
			if (kPresent) {
				// Let kValue be ? Get(O, Pk).
				const kValue = Get(O, Pk);

				// Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), kValue).
				CreateDataPropertyOrThrow(A, ToString(n), kValue);
			}

			// Set k to k + 1.
			k = k + 1;

			// Set n to n + 1.
			n = n + 1;
		}

		// Perform ? Set(A, "length", n, true).
		Set(A, "length", n, true);

		// Return A.
		return A;
	}
};
