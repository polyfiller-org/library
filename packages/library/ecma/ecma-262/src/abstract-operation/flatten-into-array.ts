import {assert, assertType} from "./assert";
import {ToString} from "./to-string";
import {HasProperty} from "./has-property";
import {Get} from "./get";
import {Call} from "./call";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {IsArray} from "./is-array";
import {ToLength} from "./to-length";
import {CreateDataPropertyOrThrow} from "./create-data-property-or-throw";
import {IsInteger} from "./is-integer";
import {SameValue} from "./same-value";
import {IsCallable} from "./is-callable";
import {makeList} from "../lib/list/list";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../constant/math-constant";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-flattenintoarray
 */
export function FlattenIntoArray<T>(target: T[], source: T[] | T[][], sourceLen: number, start: number, depth: number, mapperFunction?: ArbitraryFunction, thisArg?: any): number {
	const mapperFunctionIsPresent = arguments.length >= 6;
	const thisArgIsPresent = arguments.length >= 7;

	// Assert: Type(target) is Object.
	assertType(target, "Object");

	// Assert: Type(source) is Object.
	assertType(source, "Object");

	// Assert: sourceLen is an integer Number ≥ 0.
	assert(IsInteger(sourceLen) && sourceLen >= 0);

	// Assert: start is an integer Number ≥ 0.
	assert(IsInteger(start) && start >= 0);

	// Assert: depth is an integer Number, +∞, or -∞.
	assert(IsInteger(depth) || SameValue(depth, +Infinity) || SameValue(depth, -Infinity));

	// Assert: If mapperFunction is present, then ! IsCallable(mapperFunction) is true, thisArg is present, and depth is 1.
	if (mapperFunctionIsPresent) {
		assert(IsCallable(mapperFunction));
		assert(thisArgIsPresent);
		assert(depth === 1);
	}

	// Let targetIndex be start.
	let targetIndex = start;

	// Let sourceIndex be 0.
	let sourceIndex = 0;

	// Repeat, while sourceIndex < sourceLen
	while (sourceIndex < sourceLen) {
		// Let P be ! ToString(sourceIndex).
		const P = ToString(sourceIndex);

		// Let exists be ? HasProperty(source, P).
		const exists = HasProperty(source, P);

		// If exists is true, then
		if (exists) {
			// Let element be ? Get(source, P).
			let element = Get(source, P);

			// If mapperFunction is present, then
			if (mapperFunctionIsPresent) {
				// Set element to ? Call(mapperFunction, thisArg, « element, sourceIndex, source »).
				element = Call(mapperFunction!, thisArg, makeList(element, sourceIndex, source));
			}

			// Let shouldFlatten be false.
			let shouldFlatten = false;

			// If depth > 0, then
			if (depth > 0) {
				// Set shouldFlatten to ? IsArray(element).
				shouldFlatten = IsArray(element);
			}

			// If shouldFlatten is true, then
			if (shouldFlatten) {
				// Let elementLen be ? ToLength(? Get(element, "length")).
				const elementLen = ToLength(Get(element as unknown as T[], "length"));

				// Set targetIndex to ? FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1).
				targetIndex = FlattenIntoArray(target, element as unknown as T[], elementLen, targetIndex, depth - 1);
			}

			// Else,
			else {
				// If targetIndex ≥ 2^53 -1, throw a TypeError exception.
				if (targetIndex >= MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
					throw new TypeError();
				}

				// Perform ? CreateDataPropertyOrThrow(target, ! ToString(targetIndex), element).
				CreateDataPropertyOrThrow(target, ToString(targetIndex), element);

				// Increase targetIndex by 1.
				targetIndex++;
			}
		}

		// Increase sourceIndex by 1.
		sourceIndex++;
	}

	// Return targetIndex.
	return targetIndex;
}
