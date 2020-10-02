import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {internals} from "../../lib/internal-slot-map/internals";
import {Call} from "../../abstract-operation/call";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-set.prototype.foreach
 */
export const {forEach: setPrototypeForEach} = {
	forEach<Value>(this: Set<Value>, callbackfn: (value: Value, set: Set<Value>) => void) {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let S be the this value.
		const S = this;

		// Perform ? RequireInternalSlot(S, [[SetData]]).
		RequireInternalSlot(S, "[[SetData]]");

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (IsCallable(callbackfn) === false) {
			throw new TypeError(`${errorFormatArgument(callbackfn)} is not a function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		const T = thisArgPresent ? thisArg : undefined;

		const internalSlots = internals(S);

		// Let entries be the List that is S.[[SetData]].
		const map = internalSlots["[[SetData]]"];
		return map.forEach(e => {
			// Perform ? Call(callbackfn, T, « e, e, S »).
			Call(callbackfn, T, makeList(e, e, S));
		}, thisArg);
	}
};
