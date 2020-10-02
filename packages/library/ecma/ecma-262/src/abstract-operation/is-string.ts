/**
 * Returns true if the given item is a string
 * @param {*} item
 * @return {item is string}
 */
export function IsString(item: unknown): item is string {
	return typeof item === "string";
}
