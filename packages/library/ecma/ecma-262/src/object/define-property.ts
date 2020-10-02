import {Type} from "../abstract-operation/type";
import {ToPropertyDescriptor} from "../abstract-operation/to-property-descriptor";
import {ToPropertyKey} from "../abstract-operation/to-property-key";
import {DefinePropertyOrThrow} from "../abstract-operation/define-property-or-throw";

/**
 * https://tc39.es/ecma262/#sec-object.defineproperty
 */
export const {defineProperty: objectDefineProperty} = {
	defineProperty<O>(O: O, P: PropertyKey, Attributes: PropertyDescriptor & ThisType<O>): O {
		// If Type(O) is not Object, throw a TypeError exception.
		if (Type(O) !== "Object") {
			throw new TypeError(`Object.defineProperty called on non-object`);
		}

		// Let key be ? ToPropertyKey(P).
		const key = ToPropertyKey(P);

		// Let desc be ? ToPropertyDescriptor(Attributes).
		const desc = ToPropertyDescriptor(Attributes);

		// Perform ? DefinePropertyOrThrow(O, key, desc).
		DefinePropertyOrThrow(O, key, desc);

		// Return O.
		return O;
	}
};
