import {ArbitraryFunction} from "../type/arbitrary-function";
import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {GetV} from "./get-v";
import {Call} from "./call";
import {List, makeList} from "../lib/list/list";

/**
 * The abstract operation Invoke is used to call a method property of an ECMAScript language value.
 * The operation is called with arguments V, P, and optionally argumentsList where V serves as both
 * the lookup point for the property and the this value of the call, P is the property key,
 * and argumentsList is the list of arguments values passed to the method. If argumentsList is not present,
 * a new empty List is used as its value.
 * https://tc39.es/ecma262/#sec-invoke
 */
export function Invoke<TV, TP extends keyof TV, TF extends TV[TP]>(
	V: TV,
	P: TP,
	argumentsList?: TF extends ArbitraryFunction ? List : never
): TF extends ArbitraryFunction ? ReturnType<TF> : never {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);

	// If argumentsList is not present, set argumentsList to a new empty List.
	if (argumentsList === undefined) {
		argumentsList = makeList() as TF extends ArbitraryFunction ? List : never;
	}

	// Let func be ? GetV(V, P).
	const func = (GetV(V, P) as unknown) as ArbitraryFunction;

	// Return ? Call(func, V, argumentsList).
	return Call(func, V, argumentsList);
}
