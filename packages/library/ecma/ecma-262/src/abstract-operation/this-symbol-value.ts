import {Type} from "./type";
import {internals} from "../lib/internal-slot-map/internals";
import {assertType} from "./assert";

/**
 * https://tc39.es/ecma262/#sec-properties-of-the-symbol-prototype-object
 * @param value
 * @returns {symbol}
 */
export function thisSymbolValue(value: unknown): symbol {
	// If Type(value) is Symbol, return value.
	if (Type(value) === "Symbol") return value as symbol;

	// If Type(value) is Object and value has a [[SymbolData]] internal slot, then
	if (Type(value) === "Object" && "[[SymbolData]]" in internals(value as Symbol)) {
		// Let s be value.[[SymbolData]].
		const s = internals(value as Symbol)["[[SymbolData]]"];

		// Assert: Type(s) is Symbol.
		assertType(s, "Symbol");

		// Return s.
		return s;
	}

	// Throw a TypeError exception.
	throw new TypeError();
}
