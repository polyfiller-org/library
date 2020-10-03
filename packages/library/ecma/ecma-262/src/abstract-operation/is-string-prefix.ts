import {assertType} from "./assert";

/**
 * The abstract operation IsStringPrefix determines if String p is a prefix of String q.
 * https://tc39.es/ecma262/#sec-isstringprefix
 */
export function IsStringPrefix(p: string, q: string): boolean {
	// Assert: Type(p) is String.
	assertType(p, "String", `Argument at position 0 must be a String`, TypeError);

	// Assert: Type(q) is String.
	assertType(q, "String", `Argument at position 1 must be a String`, TypeError);

	// If q can be the string-concatenation of p and some other String r, return true. Otherwise, return false.
	// NOTE: Any String is a prefix of itself, because r may be the empty String.
	return q.substring(0, p.length) === p;
}
