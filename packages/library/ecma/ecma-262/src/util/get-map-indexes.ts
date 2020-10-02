import {List} from "../lib/list/list";
import {MapDataEntry} from "../internal-slot/map/map-internals";
import {getMapDataIndex} from "./get-map-data-index";
import {SameValueZero} from "../abstract-operation/same-value-zero";

export interface GetMapIndexesResult {
	mapDataIndex: number;
	entryIndex?: number;
	keyIndex?: number;
}

export function getMapIndexes<Key, Value>(key: Key, mapData: List<List<MapDataEntry<Key, Value>>>): GetMapIndexesResult {
	const mapDataIndex = getMapDataIndex(key, mapData);
	const values = mapData.get(mapDataIndex);
	const valuesLength = values.length;

	for (let entryIndex = 0; entryIndex < valuesLength; entryIndex++) {
		const entry = values.get(entryIndex);
		if (SameValueZero(entry["[[Key]]"], key)) {
			return {mapDataIndex, entryIndex, keyIndex: entry["[[KeyIndex]]"]};
		}
	}

	return {mapDataIndex};
}
