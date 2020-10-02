import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {IsCallable} from "../../abstract-operation/is-callable";
import {timSort} from "../../lib/tim-sort/tim-sort";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.sort
 */
export const {sort: arrayPrototypeSort} = {
	sort<T>(this: T[], comparefn: (a: T, b: T) => number): T[] {
		// If comparefn is not undefined and IsCallable(comparefn) is false, throw a TypeError exception.
		if (comparefn !== undefined && IsCallable(comparefn) === false) {
			throw new TypeError(`The comparison function must be either a function or undefined`);
		}

		// Let obj be ? ToObject(this value).
		const obj = ToObject(this);

		// Let len be ? LengthOfArrayLike(obj).
		const len = LengthOfArrayLike(obj);

		timSort(this, comparefn, 0, len);
		return this;
	}
};
