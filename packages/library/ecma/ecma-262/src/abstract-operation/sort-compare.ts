import {ToNumber} from "./to-number";
import {Call} from "./call";
import {SameValue} from "./same-value";
import {ToString} from "./to-string";
import {AbstractRelationalComparison} from "../algorithm/abstract-relational-comparison";
import {makeList} from "../lib/list/list";

/**
 * The SortCompare abstract operation is called with two arguments x and y.
 * It also has access to the comparefn argument passed to the current invocation of the sort method.
 * https://tc39.es/ecma262/#sec-sortcompare
 * 
 */
export function SortCompare<X, Y>(x: X, y: Y, comparefn?: (a: X, b: Y) => number): number {
	// If x and y are both undefined, return +0.
	if (x === undefined && y === undefined) {
		return +0;
	}

	// If x is undefined, return 1.
	if (x === undefined) {
		return 1;
	}

	// If y is undefined, return -1.
	if (y === undefined) {
		return -1;
	}

	// If comparefn is not undefined, then
	if (comparefn !== undefined) {
		// Let v be ? ToNumber(? Call(comparefn, undefined, « x, y »)).
		const v = ToNumber(Call(comparefn, undefined, makeList(x, y)));

		// If v is NaN, return +0.
		if (SameValue(v, NaN)) {
			return +0;
		}

		// Return v.
		return v;
	}

	// Let xString be ? ToString(x).
	const xString = ToString(x);

	// Let yString be ? ToString(y).
	const yString = ToString(y);

	// Let xSmaller be the result of performing Abstract Relational Comparison xString < yString.
	const xSmaller = AbstractRelationalComparison(xString, yString);

	// If xSmaller is true, return -1.
	if (xSmaller === true) {
		return -1;
	}

	// Let ySmaller be the result of performing Abstract Relational Comparison yString < xString.
	const ySmaller = AbstractRelationalComparison(yString, xString);

	// If ySmaller is true, return 1.
	if (ySmaller === true) {
		return -1;
	}

	// Return +0.
	return +0;
}
