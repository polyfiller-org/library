import {PromiseCapability} from "../type/promise-capability";
import {IsAbruptCompletion} from "./is-abrupt-completion";
import {Completion} from "../type/completion";
import {Call} from "./call";
import {IsCompletion} from "./is-completion";
import {ShorthandSequenceArgument, ShorthandSequenceReturn} from "../type/shorthand-sequence";
import {InternalPromise} from "../type/internal-promise";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-ifabruptrejectpromise
 */
export function IfAbruptRejectPromise<T, U>(
	value: ShorthandSequenceArgument<Completion<U> | U>,
	capability: ShorthandSequenceArgument<PromiseCapability<T>>
): ShorthandSequenceReturn<InternalPromise<T> | undefined> {
	// If value is an abrupt completion, then
	if (IsAbruptCompletion(value.input)) {
		// Perform ? Call(capability.[[Reject]], undefined, « value.[[Value]] »).
		Call(capability.input["[[Reject]]"]!, undefined, makeList(value.input["[[Value]]"]));
		// Return capability.[[Promise]].
		return {
			some: true,
			value: capability.input["[[Promise]]"]
		};
	}

	// Else if value is a Completion Record, set value to value.[[Value]].
	else if (IsCompletion(value.input)) {
		value.output(value.input["[[Value]]"]!);
	}

	return {
		some: false
	};
}
