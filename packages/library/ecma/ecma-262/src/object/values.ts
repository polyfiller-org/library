import {ToObject} from "../abstract-operation/to-object";
import {EnumerableOwnPropertyNames} from "../abstract-operation/enumerable-own-property-names";
import {CreateArrayFromList} from "../abstract-operation/create-array-from-list";

/**
 * https://tc39.es/ecma262/#sec-object.values
 */
export const {values: objectValues} = {
	values<TO>(O: TO) {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Let nameList be ? EnumerableOwnPropertyNames(obj, "value").
		const nameList = EnumerableOwnPropertyNames(obj, "value");

		// Return CreateArrayFromList(nameList).
		return CreateArrayFromList(nameList);
	}
};
