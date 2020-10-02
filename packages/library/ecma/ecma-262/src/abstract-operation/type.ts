import {EcmascriptLanguageType, EcmascriptLanguageTypeLiteral} from "../type/ecmascript-language-type";
import {SYMBOL_LIST} from "../symbol/symbol";

/**
 * Algorithms within this specification manipulate values each of which has an associated type.
 * The possible value types are exactly those defined in this clause.
 * Types are further subclassified into ECMAScript language types and specification types.
 * Within this specification, the notation “Type(x)” is used as shorthand for “the type of x” where “type”
 * refers to the ECMAScript language and specification types defined in this clause.
 * When the term “empty” is used as if it was naming a value, it is equivalent to saying “no value of any type”.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-data-types-and-values
 */
export function Type(x: undefined): "Undefined";
export function Type(x: null): "Null";
export function Type(x: string): "String";
export function Type(x: boolean): "Boolean";
export function Type(x: number): "Number";
export function Type(x: symbol): "Symbol";
export function Type(x: object): "Object";
export function Type(x: unknown): EcmascriptLanguageType;
export function Type(x: EcmascriptLanguageTypeLiteral): EcmascriptLanguageType {
	switch (typeof x) {
		case "undefined":
			return "Undefined";
		case "boolean":
			return "Boolean";
		case "number":
			return "Number";
		case "string":
			return "String";
		case "symbol":
			return "Symbol";
		default:
			if (x === null) return "Null";
			if (SYMBOL_LIST.has(x as symbol)) return "Symbol";

			return "Object";
	}
}
