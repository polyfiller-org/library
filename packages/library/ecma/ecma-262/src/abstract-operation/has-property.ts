import {IsPropertyKey} from "./is-property-key";
import {internals} from "../lib/internal-slot-map/internals";
import {assert, assertType} from "./assert";

/**
 * The abstract operation HasProperty is used to determine whether an object has a
 * property with the specified property key. The property may be either an own or inherited.
 * A Boolean value is returned. The operation is called with arguments O and P where O is the object and
 * P is the property key.
 *
 * https://tc39.github.io/ecma262/#sec-hasproperty
 * @param {T} O
 * @param {PropertyKey} P
 * @returns {boolean}
 */
export function HasProperty<T extends {}>(O: T, P: PropertyKey): O is T & {[Key in typeof P]: unknown} {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Argument on position 0 must be an object`);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument on position 1 must be a PropertyKey`);

	// Return ? O.[[HasProperty]](P).
	return internals(O)["[[HasProperty]]"](P);
}
