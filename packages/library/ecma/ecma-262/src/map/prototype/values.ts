import {CreateMapIterator} from "../../abstract-operation/create-map-iterator";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.values
 */
export const {values: mapPrototypeValues} = {
	values<Key, Value>(this: Map<Key, Value>) {
		// Let M be the this value.
		const M = this;

		// Return ? CreateMapIterator(M, "value").
		return CreateMapIterator(M, "value");
	}
};
