import {List} from "./list";

/**
 * Returns true if the given item is a List
 */
export function IsList<T>(item: unknown): item is List<T> {
	if (typeof item !== "object" || item == null) return false;

	return "set" in item && "get" in item && "delete" in item && "append" in item && "indexOf" in item && "has" in item;
}
