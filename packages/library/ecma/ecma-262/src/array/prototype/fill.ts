import {ToObject} from "../../abstract-operation/to-object";
import {ToLength} from "../../abstract-operation/to-length";
import {Set} from "../../abstract-operation/set";
import {Get} from "../../abstract-operation/get";
import {ToInteger} from "../../abstract-operation/to-integer";
import {ToString} from "../../abstract-operation/to-string";
import {max, min} from "../../algorithm/math";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.fill
 */
export const {fill: arrayPrototypeFill} = {
	fill<T>(this: T[], value: T): T[] {
		// The start and end arguments are optional with default values of 0 and the length of the this object.
		// If start is negative, it is treated as length + start where length is the length of the array.
		// If end is negative, it is treated as length + end.
		const start = (arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0) as number;
		const end = (arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.length) as number;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? ToLength(? Get(O, "length")).
		const len = ToLength(Get(O, "length"));

		// Let relativeStart be ? ToInteger(start).
		const relativeStart = ToInteger(start);

		// If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len).
		// Note: Math.[max|min] is part of ES3 and thus can be used directly
		let k = relativeStart < 0 ? max(len + relativeStart, 0) : min(relativeStart, len);

		// If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		const relativeEnd = end === undefined ? len : ToInteger(end);

		// If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		// Note: Math.[max|min] is part of ES3 and thus can be used directly
		const final = relativeEnd < 0 ? max(len + relativeEnd, 0) : min(relativeEnd, len);

		// Repeat, while k < final
		while (k < final) {
			// Let Pk be ! ToString(k).
			const Pk = ToString(k);

			// Perform ? Set(O, Pk, value, true).
			Set(O, Pk, value, true);

			// Increase k by 1.
			k++;
		}

		// Return O.
		return O;
	}
};
