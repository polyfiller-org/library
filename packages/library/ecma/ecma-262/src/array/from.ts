import {IsCallable} from "../abstract-operation/is-callable";
import {errorFormatArgument} from "../util/error-format-argument";
import {GetMethod} from "../abstract-operation/get-method";
import {IsConstructor} from "../abstract-operation/is-constructor";
import {Construct} from "../abstract-operation/construct";
import {ArrayCreate} from "../abstract-operation/array-create";
import {ToString} from "../abstract-operation/to-string";
import {Set} from "../abstract-operation/set";
import {Call} from "../abstract-operation/call";
import {ToObject} from "../abstract-operation/to-object";
import {Get} from "../abstract-operation/get";
import {LengthOfArrayLike} from "../abstract-operation/length-of-array-like";
import {GetIterator} from "../abstract-operation/get-iterator";
import {IteratorValue} from "../abstract-operation/iterator-value";
import {ThrowCompletion} from "../abstract-operation/throw-completion";
import {IteratorClose} from "../abstract-operation/iterator-close";
import {IteratorStep} from "../abstract-operation/iterator-step";
import {CreateDataPropertyOrThrow} from "../abstract-operation/create-data-property-or-throw";
import {executeWithCompletion} from "../util/execute-with-completion";
import {Completion} from "../type/completion";
import {IsAbruptCompletion} from "../abstract-operation/is-abrupt-completion";
import {makeList} from "../lib/list/list";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../constant/math-constant";

/**
 * https://tc39.es/ecma262/#sec-array.from
 */
function from<TT>(items: Iterable<TT> | ArrayLike<TT>): TT[];
function from<TT, TU, ThisArg>(items: Iterable<TT> | ArrayLike<TT>, mapfn: (v: TT, k: number) => TU, thisArg?: ThisArg): TU[];
function from<TT, TU, ThisArg>(this: TT[] | TU[], items: Iterable<TT> | ArrayLike<TT>, mapfn?: (v: TT, k: number) => TU, thisArg?: ThisArg): TT[] | TU[];
function from<TT, TU, ThisArg, ActualThis extends TT[] | TU[]>(this: TT[] | TU[], items: Iterable<TT> | ArrayLike<TT>): TT[] | TU[] {
	let mapping: boolean;
	let T: ThisArg | undefined;
	let A: ActualThis;
	let k: number;
	let mappedValue: TT | TU | Completion<TT | TU>;

	if (new.target != null) {
		throw new TypeError(`Array.from is not a constructor`);
	}

	// Let C be the this value.
	const C = this;

	const mapfn = arguments.length < 2 ? undefined : arguments[1];
	const thisArg = arguments.length < 3 ? undefined : arguments[2];
	const thisArgPresent = arguments.length >= 3;

	// If mapfn is undefined, let mapping be false.
	if (mapfn === undefined) {
		mapping = false;
	}

	// Else,
	else {
		// If IsCallable(mapfn) is false, throw a TypeError exception.
		if (!IsCallable(mapfn)) {
			throw new TypeError(`${errorFormatArgument(mapfn)} is not a Function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		T = thisArgPresent ? thisArg : undefined;

		// Let mapping be true.
		mapping = true;
	}

	// Let usingIterator be ? GetMethod(items, @@iterator).
	const usingIterator = GetMethod(items, Symbol.iterator as keyof typeof items);

	// If usingIterator is not undefined, then
	if (usingIterator !== undefined) {
		// If IsConstructor(C) is true, then
		if (IsConstructor(C)) {
			// Let A be ? Construct(C).
			A = Construct(C);
		}

		// Else,
		else {
			// Let A be ! ArrayCreate(0).
			A = ArrayCreate(0) as ActualThis;
		}

		// Let iteratorRecord be ? GetIterator(items, sync, usingIterator).
		const iteratorRecord = GetIterator(items, "sync", usingIterator);

		// Let k be 0.
		k = 0;

		// Repeat,
		while (true) {
			// If k ≥ (2^53) - 1, then
			// Note: Math.pow is part of ES3, so this is OK
			if (k >= MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
				// Let error be ThrowCompletion(a newly created TypeError object).
				const error = ThrowCompletion(new TypeError());

				// Return ? IteratorClose(iteratorRecord, error).
				return IteratorClose(iteratorRecord, error);
			}

			// Let Pk be ! ToString(k).
			const Pk = ToString(k);

			// Let next be ? IteratorStep(iteratorRecord).
			const next = IteratorStep(iteratorRecord);

			// If next is false, then
			if (next === false) {
				// Perform ? Set(A, "length", k, true).
				Set(A, "length", k, true);

				// Return A.
				return A;
			}

			// Let nextValue be ? IteratorValue(next).
			const nextValue = IteratorValue(next as IteratorResult<TT>);

			// If mapping is true, then
			if (mapping) {
				// Let mappedValue be Call(mapfn, T, « nextValue, k »).
				// NOTE: When mapping is true, mapfn is always defined.
				mappedValue = executeWithCompletion(() => Call(mapfn, T, makeList(nextValue, k)));
				// If mappedValue is an abrupt completion, return ? IteratorClose(iteratorRecord, mappedValue).
				if (IsAbruptCompletion(mappedValue)) {
					return IteratorClose(iteratorRecord, mappedValue);
				}

				// Set mappedValue to mappedValue.[[Value]].
				mappedValue = mappedValue["[[Value]]"]!;
			}

			// Else, let mappedValue be nextValue.
			else {
				mappedValue = nextValue;
			}

			// Let defineStatus be CreateDataPropertyOrThrow(A, Pk, mappedValue).
			const defineStatus = executeWithCompletion(() => CreateDataPropertyOrThrow(A, Pk, mappedValue));

			// If defineStatus is an abrupt completion, return ? IteratorClose(iteratorRecord, defineStatus).
			if (IsAbruptCompletion(defineStatus)) {
				return IteratorClose(iteratorRecord, defineStatus);
			}

			// Set k to k + 1.
			k = k + 1;
		}
	}

	// NOTE: items is not an Iterable so assume it is an array-like object.
	// Let arrayLike be ! ToObject(items).
	const arrayLike = ToObject(items);

	// Let len be ? LengthOfArrayLike(arrayLike).
	const len = LengthOfArrayLike(arrayLike as ArrayLike<TT>);

	// If IsConstructor(C) is true, then
	if (IsConstructor(C)) {
		// Let A be ? Construct(C, « len »).
		A = Construct(C, makeList(len));
	}

	// Else,
	else {
		// Let A be ? ArrayCreate(len).
		A = ArrayCreate(len) as ActualThis;
	}

	// Let k be 0.
	k = 0;

	// Repeat, while k < len
	while (k < len) {
		// Let Pk be ! ToString(k).
		const Pk = ToString(k);

		// Let kValue be ? Get(arrayLike, Pk).
		const kValue = Get(arrayLike, Pk as keyof typeof arrayLike);

		// If mapping is true, then
		if (mapping) {
			// Let mappedValue be ? Call(mapfn, T, « kValue, k »).
			// NOTE: When mapping is true, mapfn is always defined.
			mappedValue = Call(mapfn, T, makeList(kValue, k));
		}

		// Else, let mappedValue be kValue.
		else {
			mappedValue = kValue;
		}

		// Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
		CreateDataPropertyOrThrow(A, Pk, mappedValue);

		// Set k to k + 1.
		k = k + 1;
	}

	// Perform ? Set(A, "length", len, true).
	Set(A, "length", len, true);

	// Return A.
	return A;
}

export {from as arrayFrom};
