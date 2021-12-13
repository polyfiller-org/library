import {OrdinaryCreateFromConstructor} from "../abstract-operation/ordinary-create-from-constructor";
import {makeList} from "../lib/list/list";
import {Constructor} from "../type/constructor";
import {Get} from "../abstract-operation/get";
import {IsCallable} from "../abstract-operation/is-callable";
import {errorFormatArgument} from "../util/error-format-argument";
import {GetIterator} from "../abstract-operation/get-iterator";
import {IteratorStep} from "../abstract-operation/iterator-step";
import {IteratorValue} from "../abstract-operation/iterator-value";
import {Call} from "../abstract-operation/call";
import {IsAbruptCompletion} from "../abstract-operation/is-abrupt-completion";
import {executeWithCompletion} from "../util/execute-with-completion";
import {IteratorClose} from "../abstract-operation/iterator-close";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-set-iterable
 */
export const {Set: SetConstructor} = {
	Set: function Set() {
		let iterable = arguments.length < 1 ? undefined : arguments[0];
		const iterablePresent = arguments.length >= 1;
		const NewTarget = new.target;

		// If NewTarget is undefined, throw a TypeError exception.
		if (NewTarget === undefined) {
			throw new TypeError(`Constructor Set requires 'new'`);
		}

		// Let set be ? OrdinaryCreateFromConstructor(NewTarget, "%Set.prototype%", « [[SetData]] »).
		const set = OrdinaryCreateFromConstructor(NewTarget as unknown as Constructor, "%SetPrototype%", makeList("[[SetData]]"));

		// Set set.[[SetData]] to a new empty List.
		// Note: We're using Map as the underlying data structure for implementing sets
		internals(set)["[[SetData]]"] = new Map();

		// If iterable is not present, set iterable to undefined.
		if (!iterablePresent) {
			iterable = undefined;
		}

		// If iterable is either undefined or null, return set.
		if (iterable == null) {
			return set;
		}

		// Let adder be ? Get(set, "add").
		const adder = Get(set, "add");

		// Let adder be ? Get(set, "add").
		// If IsCallable(adder) is false, throw a TypeError exception.
		if (IsCallable(adder) === false) {
			throw new TypeError(`${errorFormatArgument(adder)} is not a function`);
		}

		// Let iteratorRecord be ? GetIterator(iterable).
		const iteratorRecord = GetIterator(iterable);

		// Repeat,
		while (true) {
			// Let next be ? IteratorStep(iteratorRecord).
			const next = IteratorStep(iteratorRecord);

			// If next is false, return set.
			if (next === false) return set;

			// Let nextValue be ? IteratorValue(next).
			const nextValue = IteratorValue(next as IteratorResult<unknown>);

			// Let status be Call(adder, set, « nextValue »).
			const status = executeWithCompletion(() => Call(adder, set, makeList(nextValue)));

			// If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
			if (IsAbruptCompletion(status)) {
				return IteratorClose(iteratorRecord, status);
			}
		}
	}
};
