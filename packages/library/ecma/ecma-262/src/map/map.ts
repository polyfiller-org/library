import {OrdinaryCreateFromConstructor} from "../abstract-operation/ordinary-create-from-constructor";
import {makeList} from "../lib/list/list";
import {Constructor} from "../type/constructor";
import {Get} from "../abstract-operation/get";
import {AddEntriesFromIterable} from "../abstract-operation/add-entries-from-iterable";
import {initializeMap} from "../util/initialize-map";

/**
 * https://tc39.es/ecma262/#sec-map-iterable
 */
export const {Map: MapConstructor} = {
	Map: function Map() {
		const iterable = arguments.length < 1 ? undefined : arguments[0];
		const iterablePresent = arguments.length >= 1;
		const NewTarget = new.target;

		// If NewTarget is undefined, throw a TypeError exception.
		if (NewTarget === undefined) {
			throw new TypeError(`Constructor Map requires 'new'`);
		}

		// Let map be ? OrdinaryCreateFromConstructor(NewTarget, "%Map.prototype%", « [[MapData]] »).
		const map = OrdinaryCreateFromConstructor(
			NewTarget as unknown as Constructor,
			"%MapPrototype%",
			makeList("[[MapData]]", "[[MapKeys]]", "[[MapLoadFactor]]", "[[MapSize]]", "[[MapCollisions]]")
		);

		initializeMap(map);

		// If iterable is not present, or is either undefined or null, return map.
		if (!iterablePresent || iterable == null) {
			return map;
		}

		// Let adder be ? Get(map, "set").
		const adder = Get(map, "set");

		// Return ? AddEntriesFromIterable(map, iterable, adder).
		return AddEntriesFromIterable(map, iterable, adder);
	}
};
