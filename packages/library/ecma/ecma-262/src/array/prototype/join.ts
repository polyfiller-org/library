import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {Get} from "../../abstract-operation/get";
import {ToString} from "../../abstract-operation/to-string";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.join
 */
export const {join: arrayPrototypeJoin} = {
	join<T>(this: T[], separator: string | undefined): string {
		let sep: string;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If separator is undefined, let sep be the single-element String ",".
		if (separator === undefined) {
			sep = ",";
		}

		// Else, let sep be ? ToString(separator).
		else {
			sep = ToString(separator);
		}

		// Let R be the empty String.
		let R = "";

		// Let k be 0.
		let k = 0;

		// Repeat, while k < len
		while (k < len) {
			// If k > 0, set R to the string-concatenation of R and sep.
			if (k > 0) {
				R = R + sep;
			}

			// Let element be ? Get(O, ! ToString(k)).
			const element = Get(O, ToString(k));

			// If element is undefined or null, let next be the empty String; otherwise, let next be ? ToString(element).
			const next = element == null ? "" : ToString(element);

			// Set R to the string-concatenation of R and next.
			R = R + next;

			// Set k to k + 1.
			k = k + 1;
		}

		// Return R.
		return R;
	}
};
