import {makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";

const INITIAL_CAPACITY = 16;
const LOAD_FACTOR = 0.75;

export function initializeMap<Key, Value>(map: Map<Key, Value>, initialCapacity: number = INITIAL_CAPACITY, loadFactor: number = LOAD_FACTOR) {
	const internalSlots = internals(map);

	// Set map.[[MapData]] to a new empty List.
	internalSlots["[[MapData]]"] = makeList();

	for (let i = 0; i < initialCapacity; i++) {
		internalSlots["[[MapData]]"].append(makeList());
	}

	internalSlots["[[MapKeys]]"] = makeList();
	internalSlots["[[MapLoadFactor]]"] = loadFactor;
	internalSlots["[[MapSize]]"] = 0;
	internalSlots["[[MapCollisions]]"] = 0;
}
