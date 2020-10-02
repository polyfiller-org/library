import {CompletionThrow} from "../type/completion";

/**
 * https://tc39.es/ecma262/#sec-throwcompletion
 * @param {T} argument
 * @returns {CompletionThrow<T>}
 */
export function ThrowCompletion<T>(argument: T): CompletionThrow<T> {
	// Return Completion { [[Type]]: throw, [[Value]]: argument, [[Target]]: empty }.
	return {
		"[[Type]]": "throw",
		"[[Value]]": argument,
		"[[Target]]": undefined
	};
}
