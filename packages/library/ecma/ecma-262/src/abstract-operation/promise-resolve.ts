import {assertType} from "./assert";
import {Get} from "./get";
import {Constructor} from "../type/constructor";
import {SameValue} from "./same-value";
import {NewPromiseCapability} from "./new-promise-capability";
import {Call} from "./call";
import {IsPromise} from "./is-promise";
import {InternalPromise} from "../type/internal-promise";
import {makeList} from "../lib/list/list";

/**
 * The abstract operation PromiseResolve, given a constructor and a value,
 * returns a new promise resolved with that value.
 * https://tc39.es/ecma262/#sec-promise-resolve
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function PromiseResolve<TC extends Constructor, TT>(C: TC, x: TT): InternalPromise<TT> {
	// Assert: Type(C) is Object.
	assertType(C, "Object", `Argument on position 0 must be an Object`, TypeError);

	// If IsPromise(x) is true, then
	if (IsPromise(x)) {
		// Let xConstructor be ? Get(x, "constructor").
		const xConstructor = Get(x, "constructor" as keyof typeof x);

		// If SameValue(xConstructor, C) is true, return x.
		if (SameValue(xConstructor, C)) {
			return x as InternalPromise<TT>;
		}
	}

	// Let promiseCapability be ? NewPromiseCapability(C).
	const promiseCapability = NewPromiseCapability(C);

	// Perform ? Call(promiseCapability.[[Resolve]], undefined, « x »).
	Call(promiseCapability["[[Resolve]]"]!, undefined, makeList(x));

	// Return promiseCapability.[[Promise]].
	return promiseCapability["[[Promise]]"] as InternalPromise<TT>;
}
