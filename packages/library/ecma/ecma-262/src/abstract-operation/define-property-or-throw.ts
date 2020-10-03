import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

/**
 * The abstract operation DefinePropertyOrThrow is used to call the [[DefineOwnProperty]]
 * internal method of an object in a manner that will throw a TypeError exception if the
 * requested property update cannot be performed. The operation is called with arguments O, P,
 * and desc where O is the object, P is the property key, and desc is the Property Descriptor for the property.
 * for the property.
 * https://tc39.es/ecma262/#sec-definepropertyorthrow
 */
export function DefinePropertyOrThrow<TO extends {}, TP extends PropertyKey>(O: TO, P: TP, desc: InternalPropertyDescriptor): boolean {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P));

	// Let success be ? O.[[DefineOwnProperty]](P, desc).
	const success = internals(O)["[[DefineOwnProperty]]"](P, desc);

	// If success is false, throw a TypeError exception.
	if (success === false) {
		throw new TypeError();
	}

	// Return success.
	return success;
}
