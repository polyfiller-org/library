import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * The abstract operation CreateDataProperty is used to create a new own property of an object.
 * The operation is called with arguments O, P, and V where O is the object, P is the property key,
 * and V is the value for the property.
 * https://tc39.github.io/ecma262/#sec-createdataproperty
 * @param {O} O
 * @param {P} P
 * @param {V} V
 * @returns {boolean}
 */
export function CreateDataProperty<O extends {}, P extends PropertyKey, V>(O: O, P: P, V: V): O is O & {[Key in P]: V} {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Argument at position 0 provided to ${CreateDataProperty.name} must be an Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 provided to ${CreateDataProperty.name} must be a PropertyKey`, TypeError);

	// Let newDesc be the PropertyDescriptor { [[Value]]: V, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
	const newDesc: InternalPropertyDescriptor = {
		"[[Value]]": V,
		"[[Writable]]": true,
		"[[Enumerable]]": true,
		"[[Configurable]]": true
	};

	// Return ? O.[[DefineOwnProperty]](P, newDesc).
	return internals(O)["[[DefineOwnProperty]]"](P, newDesc);
}
