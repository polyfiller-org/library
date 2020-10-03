import {IsPropertyKey} from "./is-property-key";
import {assert, assertType} from "./assert";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * The abstract operation DeletePropertyOrThrow is used to remove a specific own property of an object.
 * It throws an exception if the property is not configurable. The operation is called with arguments O
 * and P where O is the object and P is the property key.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-deletepropertyorthrow
 */
export function DeletePropertyOrThrow<TO extends {}, TP extends PropertyKey>(O: TO, P: TP): boolean {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Argument ${errorFormatArgument(O)} on position 0 is not an Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument ${errorFormatArgument(P)} on position 1 is not a PropertyKey`);

	// Let success be ? O.[[Delete]](P).
	const success = internals(O)["[[Delete]]"](P);

	// If success is false, throw a TypeError exception.
	if (!success) {
		throw new TypeError();
	}

	// Return success.
	return success;
}
