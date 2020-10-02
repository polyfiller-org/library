import {CreateSetIterator} from "../../abstract-operation/create-set-iterator";

/**
 * https://tc39.es/ecma262/#sec-set.prototype.values
 */
export const {values: setPrototypeValues} = {
	values<Value>(this: Set<Value>) {
		// Let S be the this value.
		const S = this;

		// Return ? CreateSetIterator(S, "value").
		return CreateSetIterator(S, "value");
	}
};
