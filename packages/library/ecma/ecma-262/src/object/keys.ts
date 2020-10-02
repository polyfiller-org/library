import {ToObject} from "../abstract-operation/to-object";
import {EnumerableOwnPropertyNames} from "../abstract-operation/enumerable-own-property-names";
import {CreateArrayFromList} from "../abstract-operation/create-array-from-list";

/**
 * https://tc39.es/ecma262/#sec-object.keys
 */
export const {keys: objectKeys} = {
	keys<O>(O: O) {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Let nameList be ? EnumerableOwnPropertyNames(obj, "key").
		const nameList = EnumerableOwnPropertyNames(obj, "key");

		// Return CreateArrayFromList(nameList).
		return CreateArrayFromList(nameList);
	}
};
