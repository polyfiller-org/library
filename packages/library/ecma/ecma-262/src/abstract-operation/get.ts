import {IsPropertyKey} from "./is-property-key";
import {StringifiedIndex} from "../type/stringified-index";
import {assert, assertType} from "./assert";
import {errorFormatArgument} from "../util/error-format-argument";
import {internals} from "../lib/internal-slot-map/internals";
import {TypedArray} from "../type/typed-array";

/**
 * The abstract operation Get is used to retrieve the value of a specific property of an object.
 * The operation is called with arguments O and P where O is the object and P is the property key.
 * https://tc39.es/ecma262/#sec-get-o-p
 * @param {O} O
 * @param {P} P
 * @returns {O[P]}
 */

export function Get<A, B>(O: Iterable<readonly [A, B]>, P: "0"): A;
export function Get<A, B>(O: Iterable<readonly [A, B]>, P: "1"): B;
export function Get<A, B>(O: Iterable<[A, B]>, P: "0"): A;
export function Get<A, B>(O: Iterable<[A, B]>, P: "1"): B;
export function Get<O extends TypedArray, P extends StringifiedIndex>(O: O, P: P): number;
export function Get<O, P extends StringifiedIndex>(O: ArrayLike<O>, P: P): O;
export function Get<O, P extends StringifiedIndex>(O: readonly O[][], P: P): readonly O[];
export function Get<O, P extends StringifiedIndex>(O: readonly O[], P: P): O;
export function Get<O, P extends StringifiedIndex>(O: readonly O[][] | readonly O[], P: P): readonly O[] | O;
export function Get<O, P extends StringifiedIndex>(O: O[][], P: P): O[];
export function Get<O, P extends StringifiedIndex>(O: O[], P: P): O;
export function Get<O, P extends StringifiedIndex>(O: O[][] | O[], P: P): O[] | O;
export function Get<O, P extends keyof O>(O: O, P: P): O[P];
export function Get<O, P extends PropertyKey | StringifiedIndex>(O: O, P: P): O[keyof O];
export function Get<O, P extends PropertyKey | StringifiedIndex>(O: O, P: P): O[keyof O] {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Given argument ${errorFormatArgument(O)} must be of type Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Given argument ${errorFormatArgument(P)} must be a PropertyKey`, TypeError);

	// Return ? O.[[Get]](P, O).
	return internals(O)["[[Get]]"](P, O) as O[keyof O];
}
