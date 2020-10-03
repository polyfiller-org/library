import {ToObject} from "../../abstract-operation/to-object";
import {Set} from "../../abstract-operation/set";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {Get} from "../../abstract-operation/get";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";
import {IsConcatSpreadable} from "../../abstract-operation/is-concat-spreadable";
import {makeList} from "../../lib/list/list";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../../constant/math-constant";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.concat
 */
export const {concat: arrayPrototypeConcat} = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	concat<T>(this: T[], _args: (T | ConcatArray<T>)[]): T[] {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let A be ? ArraySpeciesCreate(O, 0).
		const A = ArraySpeciesCreate(O, 0);

		// Let n be 0.
		let n = 0;

		// Let items be a List whose first element is O
		// and whose subsequent elements are, in left to right order,
		// the arguments that were passed to this function invocation.
		const items = makeList(O);
		for (let i = 0; i < arguments.length; i++) {
			items.append(arguments[i]);
		}

		// Repeat, while items is not empty
		while (items.length > 0) {
			// Remove the first element from items and let E be the value of the element.
			// Note Array.prototype.unshift is part of ES3 so this is OK!
			const E = Array.prototype.shift.call(items);

			// Let spreadable be ? IsConcatSpreadable(E).
			const spreadable = IsConcatSpreadable(E);

			// If spreadable is true, then
			if (spreadable) {
				// Let k be 0.
				let k = 0;
				// Let len be ? LengthOfArrayLike(E).
				const len = LengthOfArrayLike(E as ConcatArray<T>);

				// If n + len > 253 - 1, throw a TypeError exception.
				if (n + len > MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
					throw new TypeError();
				}

				// Repeat, while k < len
				while (k < len) {
					// Let P be ! ToString(k).
					const P = ToString(k);

					// Let exists be ? HasProperty(E, P).
					const exists = HasProperty(E as ConcatArray<T>, P);

					// If exists is true, then
					if (exists) {
						// Let subElement be ? Get(E, P).
						const subElement = Get(E as ConcatArray<T>, P as keyof ConcatArray<T>);

						// Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), subElement).
						CreateDataPropertyOrThrow(A, ToString(n), subElement);
					}

					// Set n to n + 1.
					n = n + 1;

					// Set k to k + 1.
					k = k + 1;
				}
			}

			// Else,
			else {
				// NOTE: E is added as a single item rather than spread.
				// If n ≥ 253 - 1, throw a TypeError exception.
				if (n >= MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
					throw new TypeError();
				}

				// Perform ? CreateDataPropertyOrThrow(A, ! ToString(n), E).
				CreateDataPropertyOrThrow(A, ToString(n), E);
				// Set n to n + 1.
				n = n + 1;
			}
		}

		// Perform ? Set(A, "length", n, true).
		Set(A, "length", n, true);

		// Return A.
		return A;
	}
};
