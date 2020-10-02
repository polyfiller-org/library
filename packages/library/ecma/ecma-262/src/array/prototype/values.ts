import {ToObject} from "../../abstract-operation/to-object";
import {CreateArrayIterator} from "../../abstract-operation/create-array-iterator";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.values
 */
export const {values: arrayPrototypeValues} = {
	values<T>(this: T[]): IterableIterator<T> {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Return CreateArrayIterator(O, "value").
		return CreateArrayIterator(O, "value");
	}
};
