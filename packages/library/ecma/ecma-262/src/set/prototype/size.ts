import {internals} from "../../lib/internal-slot-map/internals";
import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";

/**
 * https://tc39.es/ecma262/#sec-get-set.prototype.size
 */
export const setPrototypeSize = (
	OrdinaryGetOwnProperty(
		{
			get size(): number {
				// Let S be the this value.
				const S = this as Set<unknown>;

				// Perform ? RequireInternalSlot(S, [[SetData]]).
				RequireInternalSlot(S, "[[SetData]]");
				return internals(S)["[[SetData]]"].size;
			}
		},
		"size"
	) as InternalGetAccessorDescriptor
)["[[Get]]"];
