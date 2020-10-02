import {internals} from "../../lib/internal-slot-map/internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {getMapIndexes} from "../../util/get-map-indexes";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.has
 */
export const {has: mapPrototypeHas} = {
	has<Key, Value>(this: Map<Key, Value>, key: Key) {
		// Let M be the this value.
		const M = this;

		// Perform ? RequireInternalSlot(M, [[MapData]]).
		RequireInternalSlot(M, "[[MapData]]");

		// Let entries be the List that is M.[[MapData]].
		const entries = internals(M)["[[MapData]]"];
		const {entryIndex} = getMapIndexes(key, entries);

		return entryIndex !== undefined;
	}
};
