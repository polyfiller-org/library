import {Type} from "../abstract-operation/type";
import {List} from "../lib/list/list";

/**
 * Checks that the given ArrayLike contains only String- or Symbol values.
 */
export function containsOnlyStringAndSymbolValues<T>(arrayLike: List<T>): boolean {
	for (let i = 0; i < arrayLike.length; i++) {
		const element = arrayLike.get(i);
		const type = Type(element);
		if (type === "String" || type === "Symbol") continue;
		return false;
	}
	return true;
}
