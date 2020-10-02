import {CreateMapIterator} from "../../abstract-operation/create-map-iterator";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.keys
 */
export const {keys: mapPrototypeKeys} = {
	keys<Key, Value>(this: Map<Key, Value>) {
		// Let M be the this value.
		const M = this;

		// Return ? CreateMapIterator(M, "key").
		return CreateMapIterator(M, "key");
	}
};
