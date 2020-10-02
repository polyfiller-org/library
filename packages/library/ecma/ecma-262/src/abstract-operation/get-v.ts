import {IsPropertyKey} from "./is-property-key";
import {ToObject} from "./to-object";
import {internals} from "../lib/internal-slot-map/internals";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * The abstract operation GetV is used to retrieve the value of a specific property of an ECMAScript language value.
 * If the value is not an object, the property lookup is performed using a wrapper object appropriate for the type of the value.
 * The operation is called with arguments V and P where V is the value and P is the property key.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-getv
 * @param {V} V
 * @param {P} P
 * @returns {V[P]}
 */
export function GetV<V, P extends keyof V>(V: V, P: P): V[P] {
	// Assert: IsPropertyKey(P) is true.
	if (!IsPropertyKey(P)) {
		throw new TypeError(`Given argument ${errorFormatArgument(P)} must be a PropertyKey`);
	}

	// Let O be ? ToObject(V).
	let O = ToObject(V);

	// Return ? O.[[Get]](P, V).
	return internals(O)["[[Get]]"](P, V) as V[P];
}
