import {List, makeList} from "../lib/list/list";

/**
 * Copies the given List
 * (Note: We can't use spreads here since Symbol.iterator may be undefined on the List)
 */
export function copyList<T>(list: List<T>): List<T> {
	const copy = makeList<T>();
	for (let i = 0; i < list.length; i++) {
		const element = list.get(i);
		copy.append(element);
	}
	return copy;
}
