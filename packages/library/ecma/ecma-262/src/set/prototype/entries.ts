import {CreateSetIterator} from "../../abstract-operation/create-set-iterator";

/**
 * https://tc39.es/ecma262/#sec-set.prototype.entries
 */
export const {entries: setPrototypeEntries} = {
	entries<Value>(this: Set<Value>) {
		// Let S be the this value.
		const S = this;

		// Return ? CreateSetIterator(S, "key+value").
		return CreateSetIterator(S, "key+value");
	}
};
