/**
 * Returns true if the given item is a string
 */
export function IsString(item: unknown): item is string {
	return typeof item === "string";
}
