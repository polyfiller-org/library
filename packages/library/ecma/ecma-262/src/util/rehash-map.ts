import {internals} from "../lib/internal-slot-map/internals";
import {initializeMap} from "./initialize-map";

export function rehashMap<Key, Value>(map: Map<Key, Value>, newCapacity: number): void {
	const newMap = new Map<Key, Value>();
	initializeMap(newMap, newCapacity);

	const internalSlots = internals(map);
	const keys = internalSlots["[[MapKeys]]"];
	for (let i = 0; i < keys.length; i++) {
		const key = keys.get(i);
		newMap.set(key["[[Key]]"], map.get(key["[[Key]]"])!);
	}

	const newMapInternalSlots = internals(newMap);

	internalSlots["[[MapData]]"] = newMapInternalSlots["[[MapData]]"];
	internalSlots["[[MapCollisions]]"] = newMapInternalSlots["[[MapCollisions]]"];
	internalSlots["[[MapKeys]]"] = newMapInternalSlots["[[MapKeys]]"];
}
