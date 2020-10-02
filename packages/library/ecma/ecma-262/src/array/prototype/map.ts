import {ToObject} from "../../abstract-operation/to-object";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {Get} from "../../abstract-operation/get";
import {Call} from "../../abstract-operation/call";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.map
 */
export const {map: arrayPrototypeMap} = {
	map<T, U, This = undefined>(this: T[], callbackfn: (this: This, value: T, index: number, array: T[]) => U): U[] {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (IsCallable(callbackfn) === false) {
			throw new TypeError(`${errorFormatArgument(callbackfn)} is not a Function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		const T = thisArgPresent ? thisArg : undefined;

		// Let A be ? ArraySpeciesCreate(O, len).
		const A = (ArraySpeciesCreate(O, len) as unknown) as U[];

		// Let k be 0.
		let k = 0;

		// Repeat, while k < len
		while (k < len) {
			// Let Pk be ! ToString(k).
			const Pk = ToString(k);

			// Let kPresent be ? HasProperty(O, Pk).
			const kPresent = HasProperty(O, Pk);

			// If kPresent is true, then
			if (kPresent === true) {
				// Let kValue be ? Get(O, Pk).
				const kValue = Get(O, Pk);

				// Let mappedValue be ? Call(callbackfn, T, « kValue, k, O »).
				const mappedValue = Call(callbackfn, T, makeList(kValue, k, O));

				// Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
				CreateDataPropertyOrThrow(A, Pk, mappedValue);
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Return A.
		return A;
	}
};
