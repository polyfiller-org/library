import {ToObject} from "../abstract-operation/to-object";
import {CreateArrayFromList} from "../abstract-operation/create-array-from-list";
import {EnumerableOwnPropertyNames} from "../abstract-operation/enumerable-own-property-names";

/**
 * https://tc39.es/ecma262/#sec-object.entries
 */
export const {entries: objectEntries} = {
	entries<T>(O: {[s: string]: T} | ArrayLike<T>): [PropertyKey, T][] {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Let nameList be ? EnumerableOwnPropertyNames(obj, "key+value").
		const nameList = EnumerableOwnPropertyNames(obj, "key+value");

		// Return CreateArrayFromList(nameList).
		return CreateArrayFromList(nameList) as [PropertyKey, T][];
	}
};
