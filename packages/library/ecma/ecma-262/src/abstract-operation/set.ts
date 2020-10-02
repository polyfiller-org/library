import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {StringifiedIndex} from "../type/stringified-index";
import {internals} from "../lib/internal-slot-map/internals";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * The abstract operation Set is used to set the value of a specific property of an object.
 * The operation is called with arguments O, P, V, and Throw where O is the object, P is the property key,
 * V is the new value for the property and Throw is a Boolean flag.
 * https://tc39.es/ecma262/#sec-set-o-p-v-throw
 * @param {O} O
 * @param {P} P
 * @param {V} V
 * @param {boolean} Throw
 * @returns {O is O&{ [Key in P]: V }}
 */
export function Set<O extends V[], P extends StringifiedIndex, V>(O: O, P: P, V: V, Throw: boolean): O is O & {[Key in P]: V};
export function Set<O, P extends keyof O, V extends O[P]>(O: O, P: P, V: V, Throw: boolean): O is O & {[Key in P]: V};
export function Set<O, P extends PropertyKey, V>(O: O, P: P, V: V, Throw: boolean): O is O;
export function Set<O, P extends PropertyKey | keyof O, V>(O: O, P: P, V: V, Throw: boolean): O is O {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Given argument ${errorFormatArgument(O)} must be of type Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Given argument ${errorFormatArgument(P)} must be a PropertyKey`, TypeError);

	// Assert: Type(Throw) is Boolean.
	assertType(Throw, "Boolean", `Argument on position 3 must be of type Boolean`, TypeError);

	// Let success be ? O.[[Set]](P, V, O).
	const internalSlots = internals(O);
	const success = internalSlots["[[Set]]"](P as keyof typeof internalSlots, V, O);

	// If success is false and Throw is true, throw a TypeError exception.
	if (!success && Throw) {
		throw new TypeError();
	}

	// Return success.
	return success;
}
