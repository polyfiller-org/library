import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {HasProperty} from "../../abstract-operation/has-property";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Call} from "../../abstract-operation/call";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.some
 */
export const {some: arrayPrototypeSome} = {
	some<T>(this: T[], callbackfn: (value: T, index: number, array: T[]) => unknown): boolean {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (IsCallable(callbackfn) === false) {
			throw new TypeError(`${errorFormatArgument(callbackfn)} is not a function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		const T = thisArgPresent ? thisArg : undefined;

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

				// Let testResult be ! ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
				const testResult = ToBoolean(Call(callbackfn, T, makeList(kValue, k, O)));

				// If testResult is true, return true.
				if (testResult === true) {
					return true;
				}
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Return false.
		return false;
	}
};
