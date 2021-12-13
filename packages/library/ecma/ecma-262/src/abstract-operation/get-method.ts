import {IsPropertyKey} from "./is-property-key";
import {IsCallable} from "./is-callable";
import {GetV} from "./get-v";
import {assert} from "./assert";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * The abstract operation GetMethod is used to get the value of a specific property of an ECMAScript language value when the value of the property is expected to be a function.
 * The operation is called with arguments V and P where V is the ECMAScript language value, P is the property key.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-getmethod
 */
export function GetMethod<TV, TP extends keyof TV, TR extends TV[TP]>(V: TV, P: TP): TR | undefined {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument ${errorFormatArgument(P)} on position 1 must be a PropertyKey`, TypeError);

	// Let func be ? GetV(V, P).
	const func = GetV(V, P);

	// If func is either undefined or null, return undefined.
	if (func === undefined || func === null) {
		return undefined;
	}

	// If IsCallable(func) is false, throw a TypeError exception.
	if (!IsCallable(func)) {
		throw new TypeError(`${errorFormatArgument(func)} is not a function`);
	}

	// Return func.
	return func as unknown as TR;
}
