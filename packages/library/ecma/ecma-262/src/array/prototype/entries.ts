import {ToObject} from "../../abstract-operation/to-object";
import {CreateArrayIterator} from "../../abstract-operation/create-array-iterator";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.entries
 */
export const {entries: arrayPrototypeEntries} = {
	entries<T>(this: T[]): IterableIterator<[number, T]> {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Return CreateArrayIterator(O, "key+value").
		return CreateArrayIterator(O, "key+value");
	}
};
