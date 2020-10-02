import {ArbitraryFunction} from "../type/arbitrary-function";
import {assert} from "../abstract-operation/assert";
import {PromiseCapability} from "../type/promise-capability";

/**
 * A GetCapabilitiesExecutor function is an anonymous built-in function that has a [[Capability]] internal slot.
 * https://tc39.es/ecma262/#sec-getcapabilitiesexecutor-functions
 * @param {ArbitraryFunction} resolve
 * @param {ArbitraryFunction} reject
 * @returns {?}
 */
export function GetCapabilitiesExecutor(this: {"[[Capability]]": PromiseCapability}, resolve: ArbitraryFunction, reject: ArbitraryFunction): undefined {
	// Let F be the active function object.
	const F = this;

	// Assert: F has a [[Capability]] internal slot whose value is a PromiseCapability Record.
	assert("[[Capability]]" in F && F["[[Capability]]"] != null);

	// Let promiseCapability be F.[[Capability]].
	const promiseCapability = F["[[Capability]]"];

	// If promiseCapability.[[Resolve]] is not undefined, throw a TypeError exception.
	if (promiseCapability["[[Resolve]]"] !== undefined) {
		throw new TypeError();
	}

	// If promiseCapability.[[Reject]] is not undefined, throw a TypeError exception.
	if (promiseCapability["[[Reject]]"] !== undefined) {
		throw new TypeError();
	}

	// Set promiseCapability.[[Resolve]] to resolve.
	promiseCapability["[[Resolve]]"] = resolve;

	// Set promiseCapability.[[Reject]] to reject.
	promiseCapability["[[Reject]]"] = reject;

	// Return undefined.
	return undefined;
}
