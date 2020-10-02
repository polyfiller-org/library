import {CreateMapIterator} from "../../abstract-operation/create-map-iterator";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.entries
 */
export const {entries: mapPrototypeEntries} = {
	entries<Key, Value>(this: Map<Key, Value>) {
		// Let M be the this value.
		const M = this;

		// Return ? CreateMapIterator(M, "key+value").
		return CreateMapIterator(M, "key+value");
	}
};
