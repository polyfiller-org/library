import {internals} from "../../lib/internal-slot-map/internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {getMapIndexes} from "../../util/get-map-indexes";
import {getMapLoadFactor} from "../../util/get-map-load-factor";
import {rehashMap} from "../../util/rehash-map";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.set
 */
export const {set: mapPrototypeSet} = {
	set<Key, Value>(this: Map<Key, Value>, key: Key, value: Value) {
		// Let M be the this value.
		const M = this;

		// Perform ? RequireInternalSlot(M, [[MapData]]).
		RequireInternalSlot(M, "[[MapData]]");

		const internalSlots = internals(M);

		// Let entries be the List that is M.[[MapData]].
		const entries = internalSlots["[[MapData]]"];
		const keys = internalSlots["[[MapKeys]]"];

		const {mapDataIndex, entryIndex} = getMapIndexes(key, entries);

		if (entryIndex === undefined) {
			keys.append({"[[Key]]": key});
			const keyIndex = keys.length - 1;

			entries.get(mapDataIndex).append({"[[Key]]": key, "[[Value]]": value, "[[KeyIndex]]": keyIndex});
			internalSlots["[[MapSize]]"]++;

			if (entries.get(mapDataIndex).length > 1) {
				internalSlots["[[MapCollisions]]"]++;
			}
		} else {
			entries.get(mapDataIndex).get(entryIndex)["[[Value]]"] = value;
		}

		const loadFactor = internalSlots["[[MapLoadFactor]]"];
		const size = internalSlots["[[MapSize]]"];

		// check if a rehash is due
		if (loadFactor > 0 && getMapLoadFactor(size, entries) > loadFactor) {
			rehashMap(M, entries.length * 2);
		}

		// Return M.
		return M;
	}
};
