import {ToObject} from "../../abstract-operation/to-object";
import {ToLength} from "../../abstract-operation/to-length";
import {Get} from "../../abstract-operation/get";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Call} from "../../abstract-operation/call";
import {makeList} from "../../lib/list/list";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.every
 */
export const {every: arrayPrototypeEvery} = {
	every<TT>(this: TT[], callbackfn: (value: TT, index: number, array: TT[]) => unknown): boolean {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? ToLength(? Get(O, "length")).
		const len = ToLength(Get(O, "length"));

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (!IsCallable(callbackfn)) {
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
			if (kPresent) {
				// Let kValue be ? Get(O, Pk).
				const kValue = Get(O, Pk);

				// Let testResult be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
				const testResult = ToBoolean(Call(callbackfn, T, makeList(kValue, k, O)));

				// If testResult is false, return false.
				if (!testResult) {
					return false;
				}
			}

			// Increase k by 1.
			k++;
		}

		// Return true.
		return true;
	}
};
