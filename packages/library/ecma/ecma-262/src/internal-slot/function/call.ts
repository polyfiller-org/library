import {ArbitraryFunction} from "../../type/arbitrary-function";
import {assert} from "../../abstract-operation/assert";
import {internals} from "../../lib/internal-slot-map/internals";
import {executeWithCompletion} from "../../util/execute-with-completion";
import {NormalCompletion} from "../../abstract-operation/normal-completion";
import {IsAbruptCompletion} from "../../abstract-operation/is-abrupt-completion";
import {IsCompletion} from "../../abstract-operation/is-completion";
import {Completion} from "../../type/completion";
import {List} from "../../lib/list/list";
import {CreateArrayFromList} from "../../abstract-operation/create-array-from-list";

/**
 * https://tc39.es/ecma262/#sec-ecmascript-function-objects-call-thisargument-argumentslist
 */

export function __Call__<F extends ArbitraryFunction, ThisArgument>(this: F, thisArgument: ThisArgument, argumentsList: List): ReturnType<F> {
	// Assert: F is an ECMAScript function object.
	assert(typeof this === "function");

	// If F.[[FunctionKind]] is "classConstructor", throw a TypeError exception.
	if (internals(this)["[[FunctionKind]]"] === "classConstructor") {
		throw new TypeError();
	}

	const argArray = CreateArrayFromList(argumentsList);

	// Let callerContext be the running execution context.
	// Let calleeContext be PrepareForOrdinaryCall(F, undefined).
	// Assert: calleeContext is now the running execution context.
	// Perform OrdinaryCallBindThis(F, calleeContext, thisArgument).
	// Let result be OrdinaryCallEvaluateBody(F, argumentsList).
	let result = executeWithCompletion(() => this.apply(thisArgument, argArray));
	// Remove calleeContext from the execution context stack and restore callerContext as the running execution context.
	// If result.[[Type]] is return, return NormalCompletion(result.[[Value]]).
	if (result["[[Type]]"] === "return" || result["[[Type]]"] === "normal") {
		return NormalCompletion(result["[[Value]]"])["[[Value]]"] as ReturnType<F>;
	}

	// ReturnIfAbrupt(result).
	if (IsAbruptCompletion(result)) {
		throw result["[[Value]]"];
	} else if (IsCompletion(result)) {
		result = (result["[[Value]]"]!) as Completion<void>;
	}

	// Return NormalCompletion(undefined).
	return NormalCompletion(undefined) as ReturnType<F>;
}
