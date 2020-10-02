import {List} from "../lib/list/list";
import {MapDataEntry} from "../internal-slot/map/map-internals";

export function getMapLoadFactor<Key, Value>(size: number, mapData: List<List<MapDataEntry<Key, Value>>>): number {
	return size / mapData.length;
}
