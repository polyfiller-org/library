import {assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * The abstract operation IsExtensible is used to determine whether additional properties can be added to the object that is O.
 * A Boolean value is returned.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-isextensible-o
 * @param {*} O
 * @return {boolean}
 */
export function IsExtensible<T>(O: T): boolean {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Expected argument at position 0: ${errorFormatArgument(O)} to be an Object`, TypeError);

	// Return ? O.[[IsExtensible]]().
	return internals(O)["[[IsExtensible]]"]();
}
