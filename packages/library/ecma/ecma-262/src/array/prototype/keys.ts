import {ToObject} from "../../abstract-operation/to-object";
import {CreateArrayIterator} from "../../abstract-operation/create-array-iterator";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.join
 */
export const {keys: arrayPrototypeKeys} = {
	keys<T>(this: T[]): IterableIterator<number> {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Return CreateArrayIterator(O, "key").
		return CreateArrayIterator(O, "key");
	}
};
