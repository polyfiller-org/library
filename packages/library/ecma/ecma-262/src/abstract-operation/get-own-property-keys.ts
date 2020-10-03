import {makeList} from "../lib/list/list";
import {ToObject} from "./to-object";
import {internals} from "../lib/internal-slot-map/internals";
import {Type} from "./type";
import {CreateArrayFromList} from "./create-array-from-list";

/**
 * https://tc39.es/ecma262/#sec-frompropertydescriptor
 */
export function GetOwnPropertyKeys<TO>(O: TO, type: "String"): string[];
export function GetOwnPropertyKeys<TO>(O: TO, type: "Symbol"): symbol[];
export function GetOwnPropertyKeys<TO>(O: TO, type: "String" | "Symbol"): (string | symbol)[];
export function GetOwnPropertyKeys<TO>(O: TO, type: "String" | "Symbol"): (string | symbol)[] {
	// Let obj be ? ToObject(O).
	const obj = ToObject(O);

	// Let keys be ? obj.[[OwnPropertyKeys]]().
	const keys = internals(obj)["[[OwnPropertyKeys]]"]();

	// Let nameList be a new empty List.
	const nameList = makeList<string | symbol>();

	// For each element nextKey of keys in List order, do
	for (let i = 0; i < keys.length; i++) {
		const nextKey = keys.get(i);

		// If Type(nextKey) is type, then
		if (Type(nextKey) === type) {
			// Append nextKey as the last element of nameList.
			nameList.append(nextKey as string | symbol);
		}
	}

	// Return CreateArrayFromList(nameList).
	return CreateArrayFromList(nameList);
}
