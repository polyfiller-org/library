import {PromiseReaction} from "../type/promise-reaction";
import {assert} from "./assert";
import {IsPromiseReaction} from "./is-promise-reaction";
import {Call} from "./call";
import {NormalCompletion} from "./normal-completion";
import {ThrowCompletion} from "./throw-completion";
import {Completion} from "../type/completion";
import {IsAbruptCompletion} from "./is-abrupt-completion";
import {EMPTY} from "../type/empty";
import {makeList} from "../lib/list/list";

/**
 * The job PromiseReactionJob with parameters reaction and argument applies the appropriate handler
 * to the incoming value, and uses the handler's return value to resolve or reject the derived promise
 * associated with that handler.
 * https://tc39.es/ecma262/#sec-promisereactionjob
 * @param {PromiseReaction<T>} reaction
 * @param {T} argument
 */
export function PromiseReactionJob<T>(reaction: PromiseReaction<T>, argument: T): Completion {
	// Assert: reaction is a PromiseReaction Record.
	assert(IsPromiseReaction(reaction));

	// Let promiseCapability be reaction.[[Capability]].
	const promiseCapability = reaction["[[Capability]]"];

	// Let type be reaction.[[Type]].
	const type = reaction["[[Type]]"];

	// Let handler be reaction.[[Handler]].
	const handler = reaction["[[Handler]]"];

	let handlerResult: Completion<T>;

	// If handler is undefined, then
	if (handler === undefined) {
		// If type is "Fulfill", let handlerResult be NormalCompletion(argument).
		if (type === "Fulfill") {
			handlerResult = NormalCompletion(argument);
		}

		// Else,
		else {
			// Assert: type is "Reject".
			assert(type === "Reject");

			// Let handlerResult be ThrowCompletion(argument).
			handlerResult = ThrowCompletion(argument);
		}
	}

	// Else, let handlerResult be Call(handler, undefined, « argument »).
	else {
		handlerResult = Call(handler, undefined, makeList(argument));
	}

	// If promiseCapability is undefined, then
	if (promiseCapability === undefined) {
		// Assert: handlerResult is not an abrupt completion.
		assert(!IsAbruptCompletion(handlerResult));

		// Return NormalCompletion(empty).
		return NormalCompletion(EMPTY);
	}

	let status;

	// If handlerResult is an abrupt completion, then
	if (IsAbruptCompletion(handlerResult)) {
		// Let status be Call(promiseCapability.[[Reject]], undefined, « handlerResult.[[Value]] »).
		status = Call(promiseCapability["[[Reject]]"]!, undefined, makeList(handlerResult["[[Value]]"]));
	}

	// Else,
	else {
		// Let status be Call(promiseCapability.[[Resolve]], undefined, « handlerResult.[[Value]] »).
		status = Call(promiseCapability["[[Resolve]]"]!, undefined, makeList(handlerResult["[[Value]]"]));
	}

	// Return Completion(status).
	// TODO: Is status actually a Completion?
	return {
		"[[Target]]": undefined,
		"[[Value]]": status,
		"[[Type]]": "normal"
	};
}
