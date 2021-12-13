import {internals} from "../lib/internal-slot-map/internals";
import {IsCallable} from "./is-callable";
import {Type} from "./type";
import {Get} from "./get";
import {SameValue} from "./same-value";
import {errorFormatArgument} from "../util/error-format-argument";
import {ArbitraryFunction} from "../type/arbitrary-function";

/**
 * The abstract operation OrdinaryHasInstance implements the default algorithm for determining if an
 * object O inherits from the instance object inheritance path provided by constructor C.
 * https://tc39.es/ecma262/#sec-ordinaryhasinstance
 */
export function OrdinaryHasInstance<TC, TO>(C: TC, O: TO): boolean {
	// If IsCallable(C) is false, return false.
	if (IsCallable(C) === false) return false;

	// If Type(O) is not Object, return false.
	if (Type(O) !== "Object") return false;

	// Let P be ? Get(C, "prototype").
	const P = Get(C, "prototype");

	// Bound functions doesn't have a prototype
	// If C has a [[BoundTargetFunction]] internal slot, then
	// Let BC be C.[[BoundTargetFunction]].
	// Return ? InstanceofOperator(O, BC).
	if (P === undefined) {
		return O instanceof (C as unknown as ArbitraryFunction);
	}

	// If Type(P) is not Object, throw a TypeError exception.
	if (Type(P) !== "Object") {
		throw new TypeError(`Prototype of ${errorFormatArgument(C)} is not an Object`);
	}

	// Repeat,
	while (true) {
		// Set O to ? O.[[GetPrototypeOf]]().
		O = internals(O)["[[GetPrototypeOf]]"]() as TO;

		// If O is null, return false.
		if (O === null) return false;

		// If SameValue(P, O) is true, return true.
		if (SameValue(P, O) === true) return true;
	}
}
