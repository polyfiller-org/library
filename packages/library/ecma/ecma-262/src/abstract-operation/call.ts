import {IsCallable} from "./is-callable";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {Constructor} from "../type/constructor";
import {List, makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * The abstract operation Call is used to call the [[Call]] internal method of a function object.
 * The operation is called with arguments F, V, and optionally argumentsList where F is the function object,
 * V is an ECMAScript language value that is the this value of the [[Call]], and argumentsList
 * is the value passed to the corresponding argument of the internal method. If argumentsList is not present,
 * a new empty List is used as its value.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-call
 */
export function Call<F extends ArbitraryFunction, V>(F: F, V: V, argumentsList?: List): ReturnType<F>;
export function Call<F extends Constructor, V>(F: F, V: V, argumentsList?: List): InstanceType<F>;
export function Call<F extends ArbitraryFunction, V>(F: F, V: V, argumentsList?: List): ReturnType<F> {
	// If argumentsList is not present, set argumentsList to a new empty List.
	if (argumentsList === undefined) {
		argumentsList = makeList();
	}
	// If IsCallable(F) is false, throw a TypeError exception.
	if (!IsCallable(F)) {
		throw new TypeError(`Argument on position 0: ${F} must be callable`);
	}

	// Return ? F.[[Call]](V, argumentsList).
	return internals(F)["[[Call]]"](V, argumentsList);
}
