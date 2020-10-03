import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * The abstract operation CreateDataProperty is used to create a new own property of an object.
 * The operation is called with arguments O, P, and V where O is the object, P is the property key,
 * and V is the value for the property.
 * https://tc39.github.io/ecma262/#sec-createdataproperty
 */
export function CreateDataProperty<TO extends {}, TP extends PropertyKey, TV>(O: TO, P: TP, V: TV): O is TO & {[Key in TP]: TV} {
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
