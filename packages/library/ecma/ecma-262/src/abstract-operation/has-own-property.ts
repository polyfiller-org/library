import {IsPropertyKey} from "./is-property-key";
import {internals} from "../lib/internal-slot-map/internals";
import {assert, assertType} from "./assert";

/**
 * The abstract operation HasOwnProperty is used to determine whether an object
 * has an own property with the specified property key. A Boolean value is returned.
 * The operation is called with arguments O and P where O is the object and P is the property key.
 * https://tc39.es/ecma262/#sec-hasownproperty
 */
export function HasOwnProperty<T extends {}>(O: T, P: PropertyKey): O is T & {[Key in typeof P]: unknown} {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P) === true);

	// Let desc be ? O.[[GetOwnProperty]](P).
	const desc = internals(O)["[[GetOwnProperty]]"](P);

	// If desc is undefined, return false.
	if (desc === undefined) return false;

	// Return true.
	return true;
}
