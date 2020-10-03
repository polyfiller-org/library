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
 */

export function Get<TA, TB>(O: Iterable<readonly [TA, TB]>, P: "0"): TA;
export function Get<TA, TB>(O: Iterable<readonly [TA, TB]>, P: "1"): TB;
export function Get<TA, TB>(O: Iterable<[TA, TB]>, P: "0"): TA;
export function Get<TA, TB>(O: Iterable<[TA, TB]>, P: "1"): TB;
export function Get<TO extends TypedArray, TP extends StringifiedIndex>(O: TO, P: TP): number;
export function Get<TO, TP extends StringifiedIndex>(O: ArrayLike<TO>, P: TP): TO;
export function Get<TO, TP extends StringifiedIndex>(O: readonly TO[][], P: TP): readonly TO[];
export function Get<TO, TP extends StringifiedIndex>(O: readonly TO[], P: TP): TO;
export function Get<TO, TP extends StringifiedIndex>(O: readonly TO[][] | readonly TO[], P: TP): readonly TO[] | TO;
export function Get<TO, TP extends StringifiedIndex>(O: TO[][], P: TP): TO[];
export function Get<TO, TP extends StringifiedIndex>(O: TO[], P: TP): TO;
export function Get<TO, TP extends StringifiedIndex>(O: TO[][] | TO[], P: TP): TO[] | TO;
export function Get<TO, TP extends keyof TO>(O: TO, P: TP): TO[TP];
export function Get<TO, TP extends PropertyKey | StringifiedIndex>(O: TO, P: TP): TO[keyof TO];
export function Get<TO, TP extends PropertyKey | StringifiedIndex>(O: TO, P: TP): TO[keyof TO] {
	// Assert: Type(O) is Object.
	assertType(O, "Object", `Given argument ${errorFormatArgument(O)} must be of type Object`, TypeError);

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Given argument ${errorFormatArgument(P)} must be a PropertyKey`, TypeError);

	// Return ? O.[[Get]](P, O).
	return internals(O)["[[Get]]"](P, O) as TO[keyof TO];
}
