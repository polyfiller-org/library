import {IsArray} from "../abstract-operation/is-array";

/**
 * https://tc39.es/ecma262/#sec-array.isarray
 */
function isArray<T>(arg: T[]): arg is T[];
function isArray<T>(arg: T[] | T): arg is T[];
function isArray<T>(arg: T[] | T): arg is T[] {
	if (new.target != null) {
		throw new TypeError(`Array.isArray is not a constructor`);
	}

	// Return ? IsArray(arg).
	return IsArray(arg);
}

export {isArray as arrayIsArray};
