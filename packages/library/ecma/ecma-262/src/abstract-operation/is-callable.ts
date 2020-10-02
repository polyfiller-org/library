import {Type} from "./type";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * The abstract operation IsCallable determines if argument, which must be an ECMAScript language value,
 * is a callable function with a [[Call]] internal method.
 * @param {*} argument
 * @returns {argument is CallableFunction}
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-iscallable
 */
export function IsCallable(argument: unknown): argument is ArbitraryFunction {
	// If Type(argument) is not Object, return false.
	if (Type(argument) !== "Object") {
		return false;
	}

	// If argument has a [[Call]] internal method, return true.
	if ("call" in (argument as object) || "[[Call]]" in (internals(argument as object) as object)) {
		return true;
	}
	// Return false.
	return false;
}
