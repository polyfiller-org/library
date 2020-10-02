import {assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-symboldescriptivestring
 * @param {symbol} sym
 * @returns {string}
 */
export function SymbolDescriptiveString(sym: symbol): string {
	// Assert: Type(sym) is Symbol.
	assertType(sym, "Symbol");

	// Let desc be sym's [[Description]] value.
	let desc = internals(sym)["[[Description]]"];

	// If desc is undefined, set desc to the empty string.
	if (desc === undefined) desc = "";

	// Assert: Type(desc) is String.
	assertType(desc, "String");

	// Return the string-concatenation of "Symbol(", desc, and ")".
	return "Symbol(" + desc + ")";
}
