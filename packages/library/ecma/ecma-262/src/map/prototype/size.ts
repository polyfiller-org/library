import {internals} from "../../lib/internal-slot-map/internals";
import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";

/**
 * https://tc39.es/ecma262/#sec-get-map.prototype.size
 */
export const mapPrototypeSize = (OrdinaryGetOwnProperty(
	{
		get size(): number {
			// Let M be the this value.
			const M = this as Map<unknown, unknown>;

			// Perform ? RequireInternalSlot(M, [[MapData]]).
			RequireInternalSlot(M, "[[MapData]]");

			return internals(M)["[[MapSize]]"];
		}
	},
	"size"
) as InternalGetAccessorDescriptor)["[[Get]]"];
