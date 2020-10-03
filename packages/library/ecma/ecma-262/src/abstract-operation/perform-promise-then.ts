import {assert} from "./assert";
import {IsPromise} from "./is-promise";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {IsPromiseCapability} from "./is-promise-capability";
import {IsCallable} from "./is-callable";
import {PromiseCapability} from "../type/promise-capability";
import {PromiseReaction} from "../type/promise-reaction";
import {InternalPromise} from "../type/internal-promise";
import {PromiseReactionJob} from "./promise-reaction-job";
import {HostPromiseRejectionTracker} from "./host-promise-rejection-tracker";
import {EnqueueJob} from "./enqueue-job";
import {PromiseJobQueue} from "../lib/job-queue/promise-job-queue";

/**
 * The abstract operation PerformPromiseThen performs the “then” operation on promise using
 * onFulfilled and onRejected as its settlement actions. If resultCapability is passed,
 * the result is stored by updating resultCapability's promise. (If it is not passed,
 * then PerformPromiseThen is being called by a specification-internal operation where the result does not matter.)
 * https://tc39.es/ecma262/#sec-performpromisethen
 */
export function PerformPromiseThen<T>(
	promise: InternalPromise<T>,
	onFulfilled: ArbitraryFunction | undefined,
	onRejected: ArbitraryFunction | undefined,
	resultCapability?: PromiseCapability<T>
): InternalPromise<T> | undefined {
	// Assert: IsPromise(promise) is true.
	assert(IsPromise(promise));

	// If resultCapability is present, then
	if (resultCapability !== undefined) {
		// Assert: resultCapability is a PromiseCapability Record.
		assert(IsPromiseCapability(resultCapability));
	}

	// Else,
	else {
		// Set resultCapability to undefined.
		resultCapability = undefined;
	}

	// If IsCallable(onFulfilled) is false, then
	if (!IsCallable(onFulfilled)) {
		// Set onFulfilled to undefined.
		onFulfilled = undefined;
	}

	// If IsCallable(onRejected) is false, then
	if (!IsCallable(onRejected)) {
		// Set onRejected to undefined.
		onRejected = undefined;
	}

	// Let fulfillReaction be the PromiseReaction { [[Capability]]: resultCapability, [[Type]]: "Fulfill", [[Handler]]: onFulfilled }.
	const fulfillReaction: PromiseReaction<T> = {
		"[[Capability]]": resultCapability,
		"[[Type]]": "Fulfill",
		"[[Handler]]": onFulfilled
	};

	// Let rejectReaction be the PromiseReaction { [[Capability]]: resultCapability, [[Type]]: "Reject", [[Handler]]: onRejected }.
	const rejectReaction: PromiseReaction<T> = {
		"[[Capability]]": resultCapability,
		"[[Type]]": "Fulfill",
		"[[Handler]]": onRejected
	};

	// If promise.[[PromiseState]] is "pending", then
	if (promise["[[PromiseState]]"] === "pending") {
		// Append fulfillReaction as the last element of the List that is promise.[[PromiseFulfillReactions]].
		promise["[[PromiseFulfillReactions]]"].push(fulfillReaction);

		// Append rejectReaction as the last element of the List that is promise.[[PromiseRejectReactions]].
		promise["[[PromiseRejectReactions]]"].push(rejectReaction);
	}

	// Else if promise.[[PromiseState]] is "fulfilled", then
	else if (promise["[[PromiseState]]"] === "fulfilled") {
		// Let value be promise.[[PromiseResult]].
		const value = promise["[[PromiseResult]]"];

		// Perform EnqueueJob("PromiseJobs", PromiseReactionJob, « fulfillReaction, value »).
		EnqueueJob(PromiseJobQueue, PromiseReactionJob, [fulfillReaction, value]);
	}

	// Else,
	else {
		// Assert: The value of promise.[[PromiseState]] is "rejected".
		assert(promise["[[PromiseState]]"] === "rejected");

		// Let reason be promise.[[PromiseResult]].
		const reason = promise["[[PromiseResult]]"];

		// If promise.[[PromiseIsHandled]] is false, perform HostPromiseRejectionTracker(promise, "handle").
		if (!promise["[[PromiseIsHandled]]"]) {
			HostPromiseRejectionTracker(promise, "handle");
		}

		// Perform EnqueueJob("PromiseJobs", PromiseReactionJob, « rejectReaction, reason »).
		EnqueueJob(PromiseJobQueue, PromiseReactionJob, [rejectReaction, reason]);
	}

	// Set promise.[[PromiseIsHandled]] to true.
	promise["[[PromiseIsHandled]]"] = true;

	// If resultCapability is undefined, then
	if (resultCapability === undefined) {
		// Return undefined.
		return undefined;
	}

	// Else,
	else {
		// Return resultCapability.[[Promise]].
		return resultCapability["[[Promise]]"];
	}
}
