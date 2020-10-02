import {internals} from "../../lib/internal-slot-map/internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";

/**
 * https://tc39.es/ecma262/#sec-set.prototype.add
 */
export const {add: setPrototypeAdd} = {
	add<Value>(this: Set<Value>, value: Value) {
		// Let S be the this value.
		const S = this;

		// Perform ? RequireInternalSlot(S, [[SetData]]).
		RequireInternalSlot(S, "[[SetData]]");
		internals(S)["[[SetData]]"].set(value, value);

		// Return S.
		return S;
	}
};
