import {ToPrimitive} from "../abstract-operation/to-primitive";
import {HINT_NUMBER} from "../hint/number";
import {Type} from "../abstract-operation/type";
import {IsStringPrefix} from "../abstract-operation/is-string-prefix";
import {ToNumber} from "../abstract-operation/to-number";
import {SameValue} from "../abstract-operation/same-value";

/**
 * The comparison x < y, where x and y are values, produces true, false, or undefined
 * (which indicates that at least one operand is NaN). In addition to x and y the algorithm takes a
 * Boolean flag named LeftFirst as a parameter. The flag is used to control the order in which operations
 * with potentially visible side-effects are performed upon x and y. It is necessary because ECMAScript
 * specifies left to right evaluation of expressions. The default value of LeftFirst is true and indicates
 * that the x parameter corresponds to an expression that occurs to the left of the y parameter's corresponding
 * expression. If LeftFirst is false, the reverse is the case and operations must be performed upon y before x.
 * https://tc39.es/ecma262/#sec-abstract-relational-comparison
 */
export function AbstractRelationalComparison(x: unknown, y: unknown, LeftFirst = true): boolean | undefined {
	let px: number | string;
	let py: number | string;

	// If the LeftFirst flag is true, then
	if (LeftFirst) {
		// Let px be ? ToPrimitive(x, hint Number).
		px = ToPrimitive(x, HINT_NUMBER);
		// Let py be ? ToPrimitive(y, hint Number).
		py = ToPrimitive(y, HINT_NUMBER);
	}
	// Else,
	else {
		// NOTE: The order of evaluation needs to be reversed to preserve left to right evaluation.
		// Let py be ? ToPrimitive(y, hint Number).
		py = ToPrimitive(y, HINT_NUMBER);
		// Let px be ? ToPrimitive(x, hint Number).
		px = ToPrimitive(x, HINT_NUMBER);
	}

	// If Type(px) is String and Type(py) is String, then
	if (Type(px as string | number) === "String" && Type(py as string | number) === "String") {
		const _px = (px as string | number) as string;
		const _py = (py as string | number) as string;
		// If IsStringPrefix(py, px) is true, return false.
		if (IsStringPrefix(_py, _px)) {
			return false;
		}
		// If IsStringPrefix(px, py) is true, return true.
		if (IsStringPrefix(_px, _py)) {
			return true;
		}
		// Let k be the smallest nonnegative integer such that the code unit at
		// index k within px is different from the code unit at index k within py.
		// (There must be such a k, for neither String is a prefix of the other.)
		let k = 0;
		for (let i = (_px.length > _py.length ? _px.length : _py.length) - 1; i >= 0; i--) {
			const pxCodeUnit = _px.charCodeAt(i);
			const pyCodeUnit = _py.charCodeAt(i);
			if (pxCodeUnit !== pyCodeUnit) {
				k = i;
			}
		}

		// Let m be the integer that is the numeric value of the code unit at index k within px.
		const m = _px[k];
		// Let n be the integer that is the numeric value of the code unit at index k within py.
		const n = _py[k];
		// If m < n, return true. Otherwise, return false.
		return m < n;
	}

	// Else,
	else {
		// NOTE: Because px and py are primitive values evaluation order is not important.
		// Let nx be ? ToNumber(px).
		const nx = ToNumber(px);

		// Let ny be ? ToNumber(py).
		const ny = ToNumber(py);

		// If nx is NaN, return undefined.
		if (isNaN(nx)) return undefined;

		// If ny is NaN, return undefined.
		if (isNaN(ny)) return undefined;

		// If nx and ny are the same Number value, return false.
		if (SameValue(nx, ny)) {
			return false;
		}

		// If nx is +0 and ny is -0, return false.
		if (SameValue(nx, +0) && SameValue(ny, -0)) {
			return false;
		}
		// If nx is -0 and ny is +0, return false.
		if (SameValue(nx, -0) && SameValue(ny, +0)) {
			return false;
		}
		// If nx is +∞, return false.
		if (SameValue(nx, +Infinity)) {
			return false;
		}
		// If ny is +∞, return true.
		if (SameValue(ny, +Infinity)) {
			return true;
		}
		// If ny is -∞, return false.
		if (SameValue(ny, -Infinity)) {
			return false;
		}
		// If nx is -∞, return true.
		if (SameValue(nx, -Infinity)) {
			return true;
		}

		// If the mathematical value of nx is less than the mathematical value of ny
		// — note that these mathematical values are both finite and not both zero —
		// return true. Otherwise, return false.
		return nx < ny;
	}
}
