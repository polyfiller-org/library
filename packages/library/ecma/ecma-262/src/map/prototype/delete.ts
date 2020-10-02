import {internals} from "../../lib/internal-slot-map/internals";
import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {getMapIndexes} from "../../util/get-map-indexes";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.delete
 */
export const {delete: mapPrototypeDelete} = {
	delete<Key, Value>(this: Map<Key, Value>, key: Key): boolean {
		// Let M be the this value.
		const M = this;

		// Perform ? RequireInternalSlot(M, [[MapData]]).
		RequireInternalSlot(M, "[[MapData]]");
		const internalSlots = internals(M);
		const mapData = internalSlots["[[MapData]]"];
		const keys = internalSlots["[[MapKeys]]"];

		const {mapDataIndex, entryIndex, keyIndex} = getMapIndexes(key, mapData);

		if (entryIndex === undefined) {
			return false;
		}

		mapData.get(mapDataIndex).deleteIndex(entryIndex);

		if (keyIndex != null) delete (keys as any)[keyIndex];
		internalSlots["[[MapSize]]"]--;

		return true;
	}
};
