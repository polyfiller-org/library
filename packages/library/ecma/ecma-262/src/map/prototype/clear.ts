import {List} from "../../lib/list/list";
import {internals} from "../../lib/internal-slot-map/internals";
import {MapDataEntry} from "../../internal-slot/map/map-internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.clear
 */
export const {clear: mapPrototypeClear} = {
	clear<Key, Value>(this: Map<Key, Value>) {
		// Let M be the this value.
		const M = this;

		// Perform ? RequireInternalSlot(M, [[MapData]]).
		RequireInternalSlot(M, "[[MapData]]");

		const internalSlots = internals(M);

		// Let entries be the List that is M.[[MapData]].
		const entries = internalSlots["[[MapData]]"] as List<List<MapDataEntry<Key, Value>>>;

		for (let i = 0; i < entries.length; i++) {
			entries.get(i).clear();
		}

		internalSlots["[[MapKeys]]"].clear();
		internalSlots["[[MapSize]]"] = 0;
		internalSlots["[[MapCollisions]]"] = 0;

		// Return undefined.
		return undefined;
	}
};
