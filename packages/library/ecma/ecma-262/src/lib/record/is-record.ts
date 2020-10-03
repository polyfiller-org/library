/**
 * Returns true if the given item is a record
 */
export function IsRecord<T>(item: T): item is Exclude<T, undefined> {
	return Object.prototype.toString.call(item) === "[object Object]";
}
