import {List, makeList} from "../lib/list/list";

/**
 * Returns true if the given List contains at least one duplicate
 * (Note: We can't use Set spreads here since Sets may not be readily available)
 */
export function containsDuplicates(list: List): boolean {
	const seen = makeList();
	for (let i = 0; i < list.length; i++) {
		const element = list.get(i);
		if (seen.indexOf(element) >= 0) return true;
		seen.append(element);
	}
	return false;
}
