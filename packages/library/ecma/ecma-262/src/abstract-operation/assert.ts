import {EcmascriptLanguageType, EcmascriptLanguageTypeLiteral} from "../type/ecmascript-language-type";
import {Type} from "./type";

type ErrorConstructor = new (...args: any[]) => Error | RangeError | SyntaxError | ReferenceError;

/**
 * The given function throws an Error if the condition is falsy
 */
export function assert(condition: any, message: string = "Assertion Error", ctor: ErrorConstructor = Error): asserts condition {
	if (!condition) {
		throw new ctor(message);
	}
}

export function assertType(x: unknown, type: "Undefined", message?: string, ctor?: ErrorConstructor): asserts x is undefined;
export function assertType(x: unknown, type: "Null", message?: string, ctor?: ErrorConstructor): asserts x is null;
export function assertType(x: unknown, type: "String", message?: string, ctor?: ErrorConstructor): asserts x is string;
export function assertType(x: unknown, type: "Boolean", message?: string, ctor?: ErrorConstructor): asserts x is boolean;
export function assertType(x: unknown, type: "Number", message?: string, ctor?: ErrorConstructor): asserts x is number;
export function assertType(x: unknown, type: "Symbol", message?: string, ctor?: ErrorConstructor): asserts x is symbol;
export function assertType(x: unknown, type: "Object", message?: string, ctor?: ErrorConstructor): asserts x is object;
export function assertType(x: unknown, type: EcmascriptLanguageType, message?: string, ctor?: ErrorConstructor): asserts x is EcmascriptLanguageTypeLiteral {
	return assert(Type(x) === type, message, ctor);
}
