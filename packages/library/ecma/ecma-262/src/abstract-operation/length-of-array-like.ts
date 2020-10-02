import {assertType} from "./assert";
import {ToLength} from "./to-length";
import {Get} from "./get";

/**
 * The abstract operation LengthOfArrayLike returns the value of the "length"
 * property of an array-like object.
 * https://tc39.es/ecma262/#sec-lengthofarraylike
 */
export function LengthOfArrayLike<T>(obj: ArrayLike<T>): number {
	// Assert: Type(obj) is Object.
	assertType(obj, "Object", `Argument on position 0 must be of type Object`, TypeError);

	// Return ? ToLength(? Get(obj, "length")).
	return ToLength(Get(obj, "length"));
}
