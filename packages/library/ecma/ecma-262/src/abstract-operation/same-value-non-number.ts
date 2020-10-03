import {assert} from "./assert";
import {Type} from "./type";

/**
 * The internal comparison abstract operation SameValueNonNumber(x, y), where neither x nor y are Number values, produces true or false.
 *
 * https://tc39.github.io/ecma262/#sec-samevaluenonnumber
 */
export function SameValueNonNumber(x: Exclude<unknown, number>, y: Exclude<unknown, number>): boolean {
	// Assert: Type(x) is not Number.
	assert(Type(x) !== "Number", `First argument 'x' must not be a number`, TypeError);

	// Assert: Type(x) is the same as Type(y).
	assert(Type(x) === Type(y), `The given arguments must have the same type`, TypeError);

	// If Type(x) is Undefined, return true.
	if (Type(x) === "Undefined") return true;

	// If Type(x) is Null, return true.
	if (Type(x) === "Null") return true;

	// If Type(x) is String, then
	if (Type(x) === "String") {
		// If x and y are exactly the same sequence of code units
		// (same length and same code units at corresponding indices), return true; otherwise, return false.
		return x === y;
	}

	// If Type(x) is Boolean, then
	if (Type(x) === "Boolean") {
		// If x and y are both true or both false, return true; otherwise, return false.
		return x === y;
	}

	// If Type(x) is Symbol, then
	if (Type(x) === "Symbol") {
		// If x and y are both the same Symbol value, return true; otherwise, return false.
		return (x as symbol).valueOf() === (y as symbol).valueOf();
	}

	// If x and y are the same Object value, return true. Otherwise, return false.
	return x === y;
}
