import {IteratorComplete} from "./iterator-complete";
import {IteratorValue} from "./iterator-value";
import {PromiseResolve} from "./promise-resolve";
import {AsyncFromSyncIteratorValueUnwrap} from "../algorithm/async-from-sync-iterator-value-unwrap";
import {CreateBuiltinFunction} from "./create-builtin-function";
import {PromiseCapability} from "../type/promise-capability";
import {PerformPromiseThen} from "./perform-promise-then";
import {InternalPromise} from "../type/internal-promise";
import {IfAbruptRejectPromise} from "./if-abrupt-reject-promise";
import {Completion} from "../type/completion";
import {ShorthandSequenceReturn} from "../type/shorthand-sequence";
import {executeWithCompletion} from "../util/execute-with-completion";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {internals} from "../lib/internal-slot-map/internals";
import {makeList} from "../lib/list/list";
import {FunctionInternals} from "../internal-slot/function/function-internals";
import {ProxyInternals} from "../internal-slot/proxy/proxy-internals";

/**
 * https://tc39.es/ecma262/#sec-asyncfromsynciteratorcontinuation
 * @returns {Promise<T>?}
 */
export function AsyncFromSyncIteratorContinuation<T>(result: IteratorResult<T>, promiseCapability: PromiseCapability<T>): Promise<T> | undefined {
	const intrinsics = getCurrentIntrinsics();
	let abruptRejectPromiseResult: ShorthandSequenceReturn<InternalPromise<T> | undefined>;

	// Let done be IteratorComplete(result).
	let done: Completion<boolean> | boolean = executeWithCompletion(() => IteratorComplete(result));

	// IfAbruptRejectPromise(done, promiseCapability).
	abruptRejectPromiseResult = IfAbruptRejectPromise(
		{
			input: done,
			output: newValue => (done = newValue)
		},
		{
			input: promiseCapability,
			output: newValue => (promiseCapability = newValue)
		}
	);

	if (abruptRejectPromiseResult.some) {
		return abruptRejectPromiseResult.value;
	}

	// Let value be IteratorValue(result).
	let value: Completion<T> | T = executeWithCompletion(() => IteratorValue(result));

	// IfAbruptRejectPromise(value, promiseCapability).
	abruptRejectPromiseResult = IfAbruptRejectPromise(
		{
			input: value,
			output: newValue => (value = newValue)
		},
		{
			input: promiseCapability,
			output: newValue => (promiseCapability = newValue)
		}
	);

	if (abruptRejectPromiseResult.some) {
		return abruptRejectPromiseResult.value;
	}

	// Let valueWrapper be PromiseResolve(%Promise%, value).
	let valueWrapper: Completion<InternalPromise<T>> | InternalPromise<T> = (executeWithCompletion(() =>
		PromiseResolve(intrinsics["[[%Promise%]]"], value)
	) as unknown) as Completion<InternalPromise<T>>;

	// IfAbruptRejectPromise(valueWrapper, promiseCapability).
	abruptRejectPromiseResult = IfAbruptRejectPromise(
		{
			input: valueWrapper,
			output: newValue => (valueWrapper = newValue)
		},
		{
			input: promiseCapability,
			output: newValue => (promiseCapability = newValue)
		}
	);

	if (abruptRejectPromiseResult.some) {
		return abruptRejectPromiseResult.value;
	}

	// Let steps be the algorithm steps defined in Async-from-Sync Iterator Value Unwrap Functions.
	const steps = AsyncFromSyncIteratorValueUnwrap;

	// Let onFulfilled be ! CreateBuiltinFunction(steps, « [[Done]] »).
	const onFulfilled = CreateBuiltinFunction(steps, makeList("[[Done]]"));
	const internalSlots = internals(onFulfilled) as ProxyInternals & FunctionInternals & {"[[Done]]": Completion<boolean>};

	// Set onFulfilled.[[Done]] to done.
	internalSlots["[[Done]]"] = done;

	// Perform ! PerformPromiseThen(valueWrapper, onFulfilled, undefined, promiseCapability).
	PerformPromiseThen((valueWrapper as unknown) as InternalPromise<T>, onFulfilled, undefined, promiseCapability);

	// Return promiseCapability.[[Promise]].
	return promiseCapability["[[Promise]]"];
}
