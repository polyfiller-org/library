import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {errorFormatArgument} from "../util/error-format-argument";
import {CreateDataProperty} from "./create-data-property";

/**
 * The abstract operation CreateDataPropertyOrThrow is used to create a new own property of an object.
 * It throws a TypeError exception if the requested property update cannot be performed. The operation
 * is called with arguments O, P, and V where O is the object, P is the property key, and V is the value
 * for the property.
 * https://tc39.es/ecma262/#sec-createdatapropertyorthrow
 * @param {O} O
 * @param {P} P
 * @param {V} V
 * @returns {boolean}
 */
export function CreateDataPropertyOrThrow<O extends {}, P extends PropertyKey, V>(O: O, P: P, V: V): O is O & {[Key in P]: V} {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Argument ${errorFormatArgument(O)} on position 0 is not an Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument ${errorFormatArgument(P)} on position 1 is not a PropertyKey`);

	// Let success be ? CreateDataProperty(O, P, V).
	const success = CreateDataProperty(O, P, V);

	// If success is false, throw a TypeError exception.
	if (!success) {
		throw new TypeError();
	}

	// Return success.
	return success;
}
