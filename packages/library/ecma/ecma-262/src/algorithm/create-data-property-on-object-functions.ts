import {internals} from "../lib/internal-slot-map/internals";
import {assert, assertType} from "../abstract-operation/assert";
import {ToPropertyKey} from "../abstract-operation/to-property-key";
import {CreateDataPropertyOrThrow} from "../abstract-operation/create-data-property-or-throw";

/**
 * A CreateDataPropertyOnObject function is an anonymous built-in function.
 * https://tc39.es/ecma262/#sec-create-data-property-on-object-functions
 */
export function CreateDataPropertyOnObject<Key, Value>(this: Object, key: Key, value: Value) {
	// Let O be the this value.
	const O = this;

	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Assert: O is an extensible ordinary object.
	assert(internals(O)["[[IsExtensible]]"]());

	// Let propertyKey be ? ToPropertyKey(key).
	const propertyKey = ToPropertyKey(key);

	// Perform ! CreateDataPropertyOrThrow(O, propertyKey, value).
	CreateDataPropertyOrThrow(O, propertyKey, value);

	// Return undefined.
	return undefined;
}
