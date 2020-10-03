import {Type} from "./type";
import {Get} from "./get";
import {ToBoolean} from "./to-boolean";
import {IsArray} from "./is-array";

/**
 * https://tc39.es/ecma262/#sec-isconcatspreadable
 */
export function IsConcatSpreadable<T>(O: unknown | Iterable<T>): O is Iterable<T> {
	// If Type(O) is not Object, return false.
	if (Type(O) !== "Object") return false;

	// Let spreadable be ? Get(O, @@isConcatSpreadable).
	const spreadable = typeof Symbol !== "undefined" && "isConcatSpreadable" in Symbol ? Get(O, Symbol.isConcatSpreadable as keyof typeof O) : undefined;

	// If spreadable is not undefined, return ! ToBoolean(spreadable).
	if (spreadable !== undefined) {
		return ToBoolean(spreadable);
	}

	// Return ? IsArray(O).
	return IsArray(O);
}
