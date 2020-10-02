import {assert} from "./assert";
import {Type} from "./type";
import {IsCallable} from "./is-callable";
import {GetIterator} from "./get-iterator";
import {IteratorStep} from "./iterator-step";
import {IteratorValue} from "./iterator-value";
import {ThrowCompletion} from "./throw-completion";
import {IteratorClose} from "./iterator-close";
import {Get} from "./get";
import {IsAbruptCompletion} from "./is-abrupt-completion";
import {Call} from "./call";
import {makeList} from "../lib/list/list";
import {executeWithCompletion} from "../util/execute-with-completion";

/**
 * The abstract operation AddEntriesFromIterable accepts a target object, an iterable of entries,
 * and an adder function to be invoked, with target as the receiver.
 * https://tc39.es/ecma262/#sec-add-entries-from-iterable
 */
export function AddEntriesFromIterable<Target, T, Key, Value>(
	target: Target,
	iterable: Iterable<readonly [PropertyKey, T]>,
	adder: (key: Key, value: Value) => any
): Target | Iterable<readonly [PropertyKey, T]> | void {
	// If IsCallable(adder) is false, throw a TypeError exception.
	if (IsCallable(adder) === false) {
		throw new TypeError();
	}

	// Assert: iterable is present, and is neither undefined nor null.
	const iterablePresent = arguments.length >= 2;
	assert(iterablePresent && iterable != null);

	// Let iteratorRecord be ? GetIterator(iterable).
	const iteratorRecord = GetIterator(iterable);

	// Repeat,
	while (true) {
		// Let next be ? IteratorStep(iteratorRecord).
		const next = IteratorStep(iteratorRecord);

		// If next is false, return target.
		if (next === false) {
			return target;
		}

		// Let nextItem be ? IteratorValue(next).
		const nextItem = IteratorValue(next as IteratorResult<Iterable<readonly [PropertyKey, T]>>);

		// If Type(nextItem) is not Object, then
		if (Type(nextItem) !== "Object") {
			// Let error be ThrowCompletion(a newly created TypeError object).
			const error = ThrowCompletion(new TypeError());

			// Return ? IteratorClose(iteratorRecord, error).
			return IteratorClose(iteratorRecord, error);
		}

		// Let k be Get(nextItem, "0").
		const k = executeWithCompletion(() => Get(nextItem, "0"));

		// If k is an abrupt completion, return ? IteratorClose(iteratorRecord, k).
		if (IsAbruptCompletion(k)) {
			return IteratorClose(iteratorRecord, k);
		}

		// Let v be Get(nextItem, "1").
		const v = executeWithCompletion(() => Get(nextItem, "1"));

		// If v is an abrupt completion, return ? IteratorClose(iteratorRecord, v).
		if (IsAbruptCompletion(v)) {
			return IteratorClose(iteratorRecord, v);
		}

		// Let status be Call(adder, target, « k.[[Value]], v.[[Value]] »).
		const status = executeWithCompletion(() => Call(adder, target, makeList(k["[[Value]]"], v["[[Value]]"])));

		// If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
		if (IsAbruptCompletion(status)) {
			return IteratorClose(iteratorRecord, status);
		}
	}
}
