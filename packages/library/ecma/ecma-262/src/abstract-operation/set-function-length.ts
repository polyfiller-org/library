import {assert, assertType} from "./assert";
import {IsExtensible} from "./is-extensible";
import {IsInteger} from "./is-integer";
import {DefinePropertyOrThrow} from "./define-property-or-throw";

/**
 * The abstract operation SetFunctionLength requires a Function argument F and a Number argument length. This operation adds a "length" property to F
 * https://tc39.es/ecma262/#sec-setfunctionlength
 * @param {T} F
 * @param {number} length
 * @returns {boolean}
 */
export function SetFunctionLength<T extends Function>(F: T, length: number): boolean {
	// Assert: F is an extensible object that does not have a "length" own property.
	// NOTE: Functions always have a length, so we can't apply the latter check
	assert(IsExtensible(F) /* && !HasOwnProperty(F, "length")*/);

	// Assert: Type(length) is Number.
	assertType(length, "Number");

	// Assert: length ≥ 0 and ! IsInteger(length) is true.
	assert(length >= 0 && IsInteger(length) === true);

	// Return ! DefinePropertyOrThrow(F, "length", PropertyDescriptor { [[Value]]: length, [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }).
	return DefinePropertyOrThrow(F, "length", {"[[Value]]": length, "[[Writable]]": false, "[[Enumerable]]": false, "[[Configurable]]": true});
}
