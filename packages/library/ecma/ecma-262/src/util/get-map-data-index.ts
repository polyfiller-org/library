import {hashFunction} from "./hash-function";
import {List} from "../lib/list/list";
import {MapDataEntry} from "../internal-slot/map/map-internals";

/**
 * Gets the MapData index position for a key based on the result of its hash function
 */
export function getMapDataIndex<Key, Value>(key: Key, mapData: List<List<MapDataEntry<Key, Value>>>): number {
	const hashValue = hashFunction(key);
	const bucketIndex = hashValue % mapData.length;
	return bucketIndex;
}
