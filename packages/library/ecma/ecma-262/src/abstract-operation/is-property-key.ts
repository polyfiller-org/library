import {Type} from "./type";

/**
 * The abstract operation IsPropertyKey determines if argument,
 * which must be an ECMAScript language value, is a value that may be used as a property key.
 * @param {*} argument
 * @return {item is PropertyKey}
 */
export function IsPropertyKey<T extends PropertyKey>(argument: T | unknown): argument is T {
	// If Type(argument) is String, return true.
	if (Type(argument) === "String") return true;
	// If Type(argument) is Symbol, return true.
	if (Type(argument) === "Symbol") return true;
	// Return false.
	return false;
}
