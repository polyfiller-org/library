import {CompletionNormal} from "../type/completion";

/**
 * https://tc39.es/ecma262/#sec-normalcompletion
 * @param {T} argument
 * @returns {CompletionNormal<T>}
 */
export function NormalCompletion<T>(argument: T): CompletionNormal<T> {
	// Return Completion { [[Type]]: normal, [[Value]]: argument, [[Target]]: empty }.
	return {
		"[[Type]]": "normal",
		"[[Value]]": argument,
		"[[Target]]": undefined
	};
}
