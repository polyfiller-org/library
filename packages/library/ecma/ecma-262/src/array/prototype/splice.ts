import {ToObject} from "../../abstract-operation/to-object";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToInteger} from "../../abstract-operation/to-integer";
import {Set} from "../../abstract-operation/set";
import {ArraySpeciesCreate} from "../../abstract-operation/array-species-create";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {Get} from "../../abstract-operation/get";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";
import {assert} from "../../abstract-operation/assert";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../../constant/math-constant";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.splice
 */
export const {splice: arrayPrototypeSplice} = {
	splice<T>(this: T[], start: number, deleteCount: number, ...items: T[]): T[] {
		let insertCount: number;
		let actualDeleteCount: number;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		const len = LengthOfArrayLike(O);

		// Let relativeStart be ? ToInteger(start).
		const relativeStart = ToInteger(start);

		// If relativeStart < 0, let actualStart be max((len + relativeStart), 0); else let actualStart be min(relativeStart, len).
		const actualStart = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

		// If the number of actual arguments is 0, then
		if (arguments.length === 0) {
			// Let insertCount be 0.
			insertCount = 0;

			// Let actualDeleteCount be 0.
			actualDeleteCount = 0;
		}

		// Else if the number of actual arguments is 1, then
		else if (arguments.length === 1) {
			// Let insertCount be 0.
			insertCount = 0;

			// Let actualDeleteCount be len - actualStart.
			actualDeleteCount = len - actualStart;
		}

		// Else,
		else {
			// Let insertCount be the number of actual arguments minus 2.
			insertCount = arguments.length - 2;

			// Let dc be ? ToInteger(deleteCount).
			const dc = ToInteger(deleteCount);

			// Let actualDeleteCount be min(max(dc, 0), len - actualStart).
			actualDeleteCount = Math.min(Math.max(dc, 0), len - actualStart);
		}

		// If len + insertCount - actualDeleteCount > 2^53 - 1, throw a TypeError exception.
		if (len + insertCount - actualDeleteCount > MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
			throw new TypeError();
		}

		// Let A be ? ArraySpeciesCreate(O, actualDeleteCount).
		const A = ArraySpeciesCreate(O, actualDeleteCount);

		// Let k be 0.
		let k = 0;

		// Repeat, while k < actualDeleteCount
		while (k < actualDeleteCount) {
			// Let from be ! ToString(actualStart + k).
			const from = ToString(actualStart + k);

			// Let fromPresent be ? HasProperty(O, from).
			const fromPresent = HasProperty(O, from);

			// If fromPresent is true, then
			if (fromPresent === true) {
				// Let fromValue be ? Get(O, from).
				const fromValue = Get(O, from);

				// Perform ? CreateDataPropertyOrThrow(A, ! ToString(k), fromValue).
				CreateDataPropertyOrThrow(A, ToString(k), fromValue);
			}

			// Set k to k + 1.
			k = k + 1;
		}

		// Perform ? Set(A, "length", actualDeleteCount, true).
		Set(A, "length", actualDeleteCount, true);

		// Let items be a List whose elements are, in left to right order,
		// the portion of the actual argument list starting with the third argument.
		// The list is empty if fewer than three arguments were passed.
		// Note: We already spread the items properly

		// Let itemCount be the number of elements in items.
		const itemCount = items.length;

		// If itemCount < actualDeleteCount, then
		if (itemCount < actualDeleteCount) {
			// Set k to actualStart.
			k = actualStart;

			// Repeat, while k < (len - actualDeleteCount)
			while (k < len - actualDeleteCount) {
				// Let from be ! ToString(k + actualDeleteCount).
				const from = ToString(k + actualDeleteCount);

				// Let to be ! ToString(k + itemCount).
				const to = ToString(k + itemCount);

				// Let fromPresent be ? HasProperty(O, from).
				const fromPresent = HasProperty(O, from);

				// If fromPresent is true, then
				if (fromPresent === true) {
					// Let fromValue be ? Get(O, from).
					const fromValue = Get(O, from);

					// Perform ? Set(O, to, fromValue, true).
					Set(O, to, fromValue, true);
				}

				// Else,
				else {
					// Assert: fromPresent is false.
					assert(fromPresent === false);

					// Perform ? DeletePropertyOrThrow(O, to).
					DeletePropertyOrThrow(O, to);
				}

				// Set k to k + 1.
				k = k + 1;
			}

			// Set k to len.
			k = len;

			// Repeat, while k > (len - actualDeleteCount + itemCount)
			while (k > len - actualDeleteCount + itemCount) {
				// Perform ? DeletePropertyOrThrow(O, ! ToString(k - 1)).
				DeletePropertyOrThrow(O, ToString(k - 1));

				// Set k to k - 1.
				k = k - 1;
			}
		}

		// Else if itemCount > actualDeleteCount, then
		else if (itemCount > actualDeleteCount) {
			// Set k to (len - actualDeleteCount).
			k = len - actualDeleteCount;

			// Repeat, while k > actualStart
			while (k > actualStart) {
				// Let from be ! ToString(k + actualDeleteCount - 1).
				const from = ToString(k + actualDeleteCount - 1);

				// Let to be ! ToString(k + itemCount - 1).
				const to = ToString(k + itemCount - 1);

				// Let fromPresent be ? HasProperty(O, from).
				const fromPresent = HasProperty(O, from);

				// If fromPresent is true, then
				if (fromPresent === true) {
					// Let fromValue be ? Get(O, from).
					const fromValue = Get(O, from);

					// Perform ? Set(O, to, fromValue, true).
					Set(O, to, fromValue, true);
				}

				// Else,
				else {
					// Assert: fromPresent is false.
					assert(fromPresent === false);

					// Perform ? DeletePropertyOrThrow(O, to).
					DeletePropertyOrThrow(O, to);
				}

				// Set k to k - 1.
				k = k - 1;
			}
		}

		// Set k to actualStart.
		k = actualStart;

		// Repeat, while items is not empty
		while (items.length > 0) {
			// Remove the first element from items and let E be the value of that element.
			const E = Array.prototype.shift.call(items);

			// Perform ? Set(O, ! ToString(k), E, true).
			Set(O, ToString(k), E, true);

			// Set k to k + 1.
			k = k + 1;
		}

		// Perform ? Set(O, "length", len - actualDeleteCount + itemCount, true).
		Set(O, "length", len - actualDeleteCount + itemCount, true);

		// Return A.
		return A;
	}
};
