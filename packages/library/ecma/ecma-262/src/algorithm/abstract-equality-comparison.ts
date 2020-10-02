import {ToPrimitive} from "../abstract-operation/to-primitive";
import {Type} from "../abstract-operation/type";
import {ToNumber} from "../abstract-operation/to-number";
import {StrictEqualityComparison} from "./strict-equality-comparison";

/**
 * The comparison x == y, where x and y are values, produces true or false.
 * https://tc39.es/ecma262/#sec-abstract-equality-comparison
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
export function AbstractEqualityComparison(x: unknown, y: unknown): boolean {
	const typeX = Type(x);
	const typeY = Type(y);

	// If Type(x) is the same as Type(y), then
	if (typeX === typeY) {
		// Return the result of performing Strict Equality Comparison x === y.
		return StrictEqualityComparison(x, y);
	}

	// If x is null and y is undefined, return true.
	if (x === null && y === undefined) return true;

	// If x is undefined and y is null, return true.
	if (x === undefined && y === null) return true;

	// If Type(x) is Number and Type(y) is String, return the result of the comparison x == ! ToNumber(y).
	if (typeX === "Number" && typeY === "String") {
		return x === ToNumber(y);
	}

	// If Type(x) is String and Type(y) is Number, return the result of the comparison ! ToNumber(x) == y.
	if (typeX === "String" && typeY === "Number") {
		return ToNumber(x) === y;
	}

	// If Type(x) is Boolean, return the result of the comparison ! ToNumber(x) == y.
	if (typeX === "Boolean") {
		return ToNumber(x) === y;
	}

	// If Type(y) is Boolean, return the result of the comparison x == ! ToNumber(y).
	if (typeY === "Boolean") {
		return x === ToNumber(y);
	}

	// If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
	if ((typeX === "String" || typeX === "Number" || typeX === "Symbol") && typeY === "Object") {
		return x === ToPrimitive(y);
	}

	// If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.
	if (typeX === "Object" && (typeY === "String" || typeY === "Number" || typeY === "Symbol")) {
		return ToPrimitive(x) === y;
	}

	// Return false.
	return false;
}
