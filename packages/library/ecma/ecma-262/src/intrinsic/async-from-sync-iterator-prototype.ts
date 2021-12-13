import {ObjectCreate} from "../abstract-operation/object-create";
import {assert} from "../abstract-operation/assert";
import {Type} from "../abstract-operation/type";
import {IteratorRecord} from "../abstract-operation/get-iterator";
import {GetMethod} from "../abstract-operation/get-method";
import {Call} from "../abstract-operation/call";
import {NewPromiseCapability} from "../abstract-operation/new-promise-capability";
import {IteratorNext} from "../abstract-operation/iterator-next";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {AsyncFromSyncIteratorContinuation} from "../abstract-operation/async-from-sync-iterator-continuation";
import {IfAbruptRejectPromise} from "../abstract-operation/if-abrupt-reject-promise";
import {Completion} from "../type/completion";
import {executeWithCompletion} from "../util/execute-with-completion";
import {ShorthandSequenceReturn} from "../type/shorthand-sequence";
import {InternalPromise} from "../type/internal-promise";
import {Constructor} from "../type/constructor";
import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";
import {errorFormatArgument} from "../util/error-format-argument";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {Realm} from "../environment/realm/realm";
import {makeList} from "../lib/list/list";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";

export interface AsyncFromSyncIteratorPrototype<T = unknown> {
	next(value: T): ArbitraryFunction | Promise<T> | undefined;
	throw(value: T): ArbitraryFunction | Promise<T> | undefined;
	return(value: T): ArbitraryFunction | Promise<T> | undefined;
}

export function $AsyncFromSyncIteratorPrototype$(realm: Realm): AsyncFromSyncIteratorPrototype {
	const intrinsics = realm["[[Intrinsics]]"];
	const proto = ObjectCreate<AsyncFromSyncIteratorPrototype>(intrinsics["[[%AsyncIteratorPrototype%]]"]);

	proto.next = function <T>(this: {"[[SyncIteratorRecord]]": IteratorRecord<T>}, value: T) {
		// Let O be the this value.
		const O = this;

		// Assert: Type(O) is Object and O has a [[SyncIteratorRecord]] internal slot.
		assert(
			Type(O) === "Object" && "[[SyncIteratorRecord]]" in O,
			`Method AsyncFromSyncIterator.prototype.next called on incompatible receiver ${errorFormatArgument(O)}`,
			TypeError
		);

		// Let promiseCapability be ! NewPromiseCapability(%Promise%).
		let promiseCapability = NewPromiseCapability<T>(intrinsics["[[%Promise%]]"] as unknown as Constructor<T>);

		// Let syncIteratorRecord be O.[[SyncIteratorRecord]].
		const syncIteratorRecord = O["[[SyncIteratorRecord]]"];

		// Let result be IteratorNext(syncIteratorRecord, value).
		let result: Completion<IteratorResult<T> | Promise<IteratorResult<T>>> | IteratorResult<T> | Promise<IteratorResult<T>> = executeWithCompletion(() =>
			IteratorNext(syncIteratorRecord, value)
		);

		// IfAbruptRejectPromise(result, promiseCapability).
		const abruptRejectPromiseResult = IfAbruptRejectPromise(
			{
				input: result,
				output: newValue => (result = newValue)
			},
			{
				input: promiseCapability,
				output: newValue => (promiseCapability = newValue)
			}
		);

		if (abruptRejectPromiseResult.some) {
			return abruptRejectPromiseResult.value;
		}

		// Return ! AsyncFromSyncIteratorContinuation(result, promiseCapability).
		return AsyncFromSyncIteratorContinuation(result as unknown as IteratorResult<T>, promiseCapability);
	};

	proto.throw = function <T>(this: {"[[SyncIteratorRecord]]": IteratorRecord<T>}, value: T) {
		let abruptRejectPromiseResult: ShorthandSequenceReturn<InternalPromise<T> | undefined>;

		// Let O be the this value.
		const O = this;

		// Assert: Type(O) is Object and O has a [[SyncIteratorRecord]] internal slot.
		assert(Type(O) === "Object" && "[[SyncIteratorRecord]]" in O);

		// Let promiseCapability be ! NewPromiseCapability(%Promise%).
		let promiseCapability = NewPromiseCapability<T>(intrinsics["[[%Promise%]]"] as unknown as Constructor<T>);

		// Let syncIterator be O.[[SyncIteratorRecord]].[[Iterator]].
		const syncIterator = O["[[SyncIteratorRecord]]"]["[[Iterator]]"];

		// Let throw be GetMethod(syncIterator, "throw").
		let _throw: Completion<ArbitraryFunction> | ArbitraryFunction = executeWithCompletion(() => GetMethod(syncIterator, "throw"));

		// IfAbruptRejectPromise(throw, promiseCapability).
		abruptRejectPromiseResult = IfAbruptRejectPromise(
			{
				input: _throw,
				output: newValue => (_throw = newValue)
			},
			{
				input: promiseCapability,
				output: newValue => (promiseCapability = newValue)
			}
		);

		if (abruptRejectPromiseResult.some) {
			return abruptRejectPromiseResult.value;
		}

		// If throw is undefined, then
		if (_throw === undefined) {
			// Perform ! Call(promiseCapability.[[Reject]], undefined, « value »).
			Call(promiseCapability["[[Reject]]"]!, undefined, makeList(value));

			// Return promiseCapability.[[Promise]].
			return promiseCapability["[[Promise]]"];
		}

		// Let result be Call(throw, syncIterator, « value »).
		let result = Call(_throw as unknown as ArbitraryFunction, syncIterator, makeList(value));

		// IfAbruptRejectPromise(result, promiseCapability).
		abruptRejectPromiseResult = IfAbruptRejectPromise(
			{
				input: result,
				output: newValue => (result = newValue)
			},
			{
				input: promiseCapability,
				output: newValue => (promiseCapability = newValue)
			}
		);

		if (abruptRejectPromiseResult.some) {
			return abruptRejectPromiseResult.value;
		}

		// If Type(result) is not Object, then
		if (Type(result) !== "Object") {
			// Perform ! Call(promiseCapability.[[Reject]], undefined, « a newly created TypeError object »).
			Call(promiseCapability["[[Reject]]"]!, undefined, makeList(new TypeError()));

			// Return promiseCapability.[[Promise]].
			return promiseCapability["[[Promise]]"];
		}

		// Return ! AsyncFromSyncIteratorContinuation(result, promiseCapability).
		return AsyncFromSyncIteratorContinuation(result, promiseCapability);
	};

	proto.return = function <T>(this: {"[[SyncIteratorRecord]]": IteratorRecord<T>}, value: T) {
		let abruptRejectPromiseResult: ShorthandSequenceReturn<InternalPromise<T> | undefined>;

		// Let O be the this value.
		const O = this;

		// Assert: Type(O) is Object and O has a [[SyncIteratorRecord]] internal slot.
		assert(Type(O) === "Object" && "[[SyncIteratorRecord]]" in O);

		// Let promiseCapability be ! NewPromiseCapability(%Promise%).
		let promiseCapability = NewPromiseCapability<T>(intrinsics["[[%Promise%]]"] as unknown as Constructor<T>);

		// Let syncIterator be O.[[SyncIteratorRecord]].[[Iterator]].
		const syncIterator = O["[[SyncIteratorRecord]]"]["[[Iterator]]"];

		// Let return be GetMethod(syncIterator, "return").
		let _return: Completion<ArbitraryFunction> | ArbitraryFunction = executeWithCompletion(() => GetMethod(syncIterator, "return"));

		// IfAbruptRejectPromise(return, promiseCapability).
		abruptRejectPromiseResult = IfAbruptRejectPromise(
			{
				input: _return,
				output: newValue => (_return = newValue)
			},
			{
				input: promiseCapability,
				output: newValue => (promiseCapability = newValue)
			}
		);

		if (abruptRejectPromiseResult.some) {
			return abruptRejectPromiseResult.value;
		}

		// If return is undefined, then
		if (_return === undefined) {
			// Let iterResult be ! CreateIterResultObject(value, true).
			const iterResult = CreateIterResultObject(value, true);

			// Perform ! Call(promiseCapability.[[Resolve]], undefined, « iterResult »).
			Call(promiseCapability["[[Resolve]]"]!, undefined, makeList(iterResult));

			// Return promiseCapability.[[Promise]].
			return promiseCapability["[[Promise]]"];
		}

		// Let result be Call(return, syncIterator, « value »).
		let result = executeWithCompletion(() => Call(_return as ArbitraryFunction, syncIterator, makeList(value)));

		// IfAbruptRejectPromise(result, promiseCapability).
		abruptRejectPromiseResult = IfAbruptRejectPromise(
			{
				input: result,
				output: newValue => (result = newValue)
			},
			{
				input: promiseCapability,
				output: newValue => (promiseCapability = newValue)
			}
		);

		if (abruptRejectPromiseResult.some) {
			return abruptRejectPromiseResult.value;
		}

		// If Type(result) is not Object, then
		if (Type(result) !== "Object") {
			// Perform ! Call(promiseCapability.[[Reject]], undefined, « a newly created TypeError object »).
			Call(promiseCapability["[[Reject]]"]!, undefined, makeList(new TypeError()));

			// Return promiseCapability.[[Promise]].
			return promiseCapability["[[Promise]]"];
		}

		// Return ! AsyncFromSyncIteratorContinuation(result, promiseCapability).
		return AsyncFromSyncIteratorContinuation(result as unknown as IteratorResult<T>, promiseCapability);
	};

	// http://www.ecma-international.org/ecma-262/10.0/index.html#sec-%asyncfromsynciteratorprototype%-@@tostringtag
	OrdinaryDefineOwnProperty(proto, Symbol.toStringTag, {
		"[[Value]]": "Async-from-Sync Iterator",
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
	if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_TO_STRING_TAG, {
			"[[Value]]": "Async-from-Sync Iterator",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
