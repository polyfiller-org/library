import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {HasProperty} from "../../abstract-operation/has-property";
import {Get} from "../../abstract-operation/get";
import {Call} from "../../abstract-operation/call";
import {ArbitraryFunction} from "../../type/arbitrary-function";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.reduceright
 */
export const {reduceRight: arrayPrototypeReduceRight} = {
	reduceRight<T>(this: T[], callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T {
		const initialValue = arguments[1] as T | undefined;
		const initialValuePresent = arguments.length > 1;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (IsCallable(callbackfn) === false) {
			throw new TypeError(`${errorFormatArgument(callbackfn)} is not a function`);
		}

		// If len is 0 and initialValue is not present, throw a TypeError exception.
		if (len === 0 && !initialValuePresent) {
			throw new TypeError(`Reduce of empty array with no initial value`);
		}

		// Let k be len - 1.
		let k = len - 1;

		// Let accumulator be undefined.
		let accumulator: T | undefined;

		// If initialValue is present, then
		if (initialValuePresent) {
			// Set accumulator to initialValue.
			accumulator = initialValue;
		}

		// Else,
		else {
			// Let kPresent be false.
			let kPresent = false;
			// Repeat, while kPresent is false and k ≥ 0
			while (kPresent === false && k >= 0) {
				// Let Pk be ! ToString(k).
				const Pk = ToString(k);

				// Set kPresent to ? HasProperty(O, Pk).
				kPresent = HasProperty(O, Pk);

				// If kPresent is true, then
				if (kPresent === true) {
					// Set accumulator to ? Get(O, Pk).
					accumulator = Get(O, Pk);
				}

				// Set k to k - 1.
				k = k - 1;
			}

			// If kPresent is false, throw a TypeError exception.
			if (kPresent === false) {
				throw new TypeError();
			}
		}

		// Repeat, while k ≥ 0
		while (k >= 0) {
			// Let Pk be ! ToString(k).
			const Pk = ToString(k);

			// Let kPresent be ? HasProperty(O, Pk).
			const kPresent = HasProperty(O, Pk);

			// If kPresent is true, then
			if (kPresent === true) {
				// Let kValue be ? Get(O, Pk).
				const kValue = Get(O, Pk);

				// Set accumulator to ? Call(callbackfn, undefined, « accumulator, kValue, k, O »).
				accumulator = Call(callbackfn as ArbitraryFunction, undefined, makeList(accumulator, kValue, k, O));
			}

			// Set k to k - 1.
			k = k - 1;
		}

		// Return accumulator.
		return accumulator!;
	}
};
