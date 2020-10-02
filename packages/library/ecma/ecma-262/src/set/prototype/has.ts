import {internals} from "../../lib/internal-slot-map/internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";

/**
 * https://tc39.es/ecma262/#sec-set.prototype.has
 */
export const {has: setPrototypeHas} = {
	has<Value>(this: Set<Value>, value: Value) {
		// Let S be the this value.
		const S = this;

		// Perform ? RequireInternalSlot(S, [[SetData]]).
		RequireInternalSlot(S, "[[SetData]]");
		return internals(S)["[[SetData]]"].has(value);
	}
};
