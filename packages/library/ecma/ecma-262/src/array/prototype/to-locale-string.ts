import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {Invoke} from "../../abstract-operation/invoke";

/**
 * An ECMAScript implementation that includes the ECMA-402 Internationalization API must implement the
 * Array.prototype.toLocaleString method as specified in the ECMA-402 specification.
 * If an ECMAScript implementation does not include the ECMA-402 API the following specification of the
 * toLocaleString method is used.
 * https://tc39.es/ecma262/#sec-array.prototype.tolocalestring
 */
export const {toLocaleString: arrayPrototypeToLocaleString} = {
	toLocaleString<T extends {toLocaleString(): string}>(this: T[]): string {
		// Let array be ? ToObject(this value).
		const array = ToObject(this);

		// Let len be ? LengthOfArrayLike(array).
		const len = LengthOfArrayLike(array);

		// Let separator be the String value for the list-separator String appropriate for the host environment's
		// current locale (this is derived in an implementation-defined way).
		const separator = ",";

		// Let R be the empty String.
		let R = "";

		// Let k be 0.
		let k = 0;

		// Repeat, while k < len
		while (k < len) {
			// If k > 0, then
			if (k > 0) {
				// Set R to the string-concatenation of R and separator.
				R = R + separator;
			}

			// Let nextElement be ? Get(array, ! ToString(k)).
			const nextElement = Get(array, ToString(k));

			// If nextElement is not undefined or null, then
			if (nextElement != null) {
				// Let S be ? ToString(? Invoke(nextElement, "toLocaleString")).
				const S = ToString(Invoke(nextElement, "toLocaleString"));

				// Set R to the string-concatenation of R and S.
				R = R + S;
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Return R.
		return R;
	}
};
