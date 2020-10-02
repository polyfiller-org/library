import {assert} from "./assert";
import {Type} from "./type";
import {IsExtensible} from "./is-extensible";
import {DefinePropertyOrThrow} from "./define-property-or-throw";

/**
 * The abstract operation SetFunctionName requires a Function argument F, a String or Symbol argument name and optionally a String argument prefix.
 * https://tc39.es/ecma262/#sec-setfunctionname
 * @param {T} F
 * @param {string} name
 * @param {string} [prefix]
 * @returns {boolean}
 */
export function SetFunctionName<T extends Function>(F: T, name: string | symbol, prefix?: string): boolean {
	// Assert: F is an extensible object that does not have a name own property.
	// NOTE: Functions always have a name property, so we can't apply the latter check
	assert(IsExtensible(F) /* && !HasOwnProperty(F, "name")*/);
	const prefixPresent = arguments.length >= 3;

	// Assert: Type(name) is either Symbol or String.
	assert(Type(name) === "Symbol" || Type(name) === "String");

	// Assert: If prefix is present, then Type(prefix) is String.
	if (prefixPresent) assert(Type(prefix) === "String");

	// If Type(name) is Symbol, then
	if (Type(name) === "Symbol") {
		// Let description be name's [[Description]] value.
		const description = (name as symbol).description;

		// If description is undefined, set name to the empty String.
		if (description === undefined) {
			name = "";
		}
		// Else, set name to the string-concatenation of "[", description, and "]".
		else {
			name = "[" + description + "]";
		}
	}

	// If prefix is present, then
	else if (prefixPresent) {
		// Set name to the string-concatenation of prefix, the code unit 0x0020 (SPACE), and name.
		name = prefix! + String.fromCharCode(0x0020) + (name as string);
	}

	// Return ! DefinePropertyOrThrow(F, "name", PropertyDescriptor { [[Value]]: name, [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }).
	return DefinePropertyOrThrow(F, "name", {"[[Value]]": name, "[[Writable]]": false, "[[Enumerable]]": false, "[[Configurable]]": true});
}
