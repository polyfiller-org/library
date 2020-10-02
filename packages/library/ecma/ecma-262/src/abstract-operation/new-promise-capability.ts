import {Constructor} from "../type/constructor";
import {IsConstructor} from "./is-constructor";
import {errorFormatArgument} from "../util/error-format-argument";
import {GetCapabilitiesExecutor} from "../algorithm/get-capabilities-executor";
import {CreateBuiltinFunction} from "./create-builtin-function";
import {Construct} from "./construct";
import {IsCallable} from "./is-callable";
import {PromiseCapability} from "../type/promise-capability";
import {InternalPromise} from "../type/internal-promise";
import {makeList} from "../lib/list/list";

/**
 * The abstract operation NewPromiseCapability takes a constructor function,
 * and attempts to use that constructor function in the fashion of the built-in Promise constructor
 * to create a Promise object and extract its resolve and reject functions. The promise plus the resolve
 * and reject functions are used to initialize a new PromiseCapability Record which is returned as the value
 * of this abstract operation.
 * https://tc39.es/ecma262/#sec-newpromisecapability
 * @param {C} C
 * @return {PromiseCapability}
 */
export function NewPromiseCapability<T>(C: Constructor<T>): PromiseCapability<T> {
	// If IsConstructor(C) is false, throw a TypeError exception.
	if (!IsConstructor(C)) {
		throw new TypeError(`${errorFormatArgument(C)} is not a Constructor`);
	}

	// NOTE: C is assumed to be a constructor function that supports the
	// parameter conventions of the Promise constructor (see 25.6.3.1).

	// Let promiseCapability be the PromiseCapability
	// { [[Promise]]: undefined, [[Resolve]]: undefined, [[Reject]]: undefined }.
	const promiseCapability: PromiseCapability<T> = {
		"[[Promise]]": undefined,
		"[[Resolve]]": undefined,
		"[[Reject]]": undefined
	};

	// Let steps be the algorithm steps defined in GetCapabilitiesExecutor Functions.
	const steps = GetCapabilitiesExecutor;

	// Let executor be ! CreateBuiltinFunction(steps, « [[Capability]] »).
	const executor = CreateBuiltinFunction<typeof steps & {"[[Capability]]": typeof promiseCapability}>(
		steps as typeof steps & {"[[Capability]]": typeof promiseCapability},
		makeList("[[Capability]]")
	);

	// Set executor.[[Capability]] to promiseCapability.
	executor["[[Capability]]"] = promiseCapability;

	// Let promise be ? Construct(C, « executor »).
	const promise = (Construct(C, makeList(executor)) as unknown) as InternalPromise<T>;

	// If IsCallable(promiseCapability.[[Resolve]]) is false, throw a TypeError exception.
	if (!IsCallable(promiseCapability["[[Resolve]]"])) {
		throw new TypeError();
	}

	// If IsCallable(promiseCapability.[[Reject]]) is false, throw a TypeError exception.
	if (!IsCallable(promiseCapability["[[Reject]]"])) {
		throw new TypeError();
	}

	// Set promiseCapability.[[Promise]] to promise.
	promiseCapability["[[Promise]]"] = promise;

	// Return promiseCapability.
	return promiseCapability;
}
