import {Constructor} from "../../type/constructor";
import {assert, assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {OrdinaryCreateFromConstructor} from "../../abstract-operation/ordinary-create-from-constructor";
import {executeWithCompletion} from "../../util/execute-with-completion";
import {NormalCompletion} from "../../abstract-operation/normal-completion";
import {IsAbruptCompletion} from "../../abstract-operation/is-abrupt-completion";
import {IsCompletion} from "../../abstract-operation/is-completion";
import {Completion} from "../../type/completion";
import {List} from "../../lib/list/list";
import {CreateArrayFromList} from "../../abstract-operation/create-array-from-list";

/**
 * https://tc39.es/ecma262/#sec-ecmascript-function-objects-construct-argumentslist-newtarget
 */
export function __Construct__<F extends Constructor>(this: F, argumentsList: List, newTarget: Constructor): InstanceType<F> {
	let thisArgument: {} | undefined;

	// Assert: F is an ECMAScript function object.
	assert(typeof this === "function");

	// Assert: Type(newTarget) is Object.
	assertType(newTarget, "Object");

	// Let callerContext be the running execution context.
	// Let kind be F.[[ConstructorKind]].
	const kind = "base";

	// If kind is "base", then
	if (kind === "base") {
		// Let thisArgument be ? OrdinaryCreateFromConstructor(newTarget, "%ObjectPrototype%").
		thisArgument = OrdinaryCreateFromConstructor(newTarget, "%ObjectPrototype%");
	}

	const argArray = CreateArrayFromList(argumentsList);

	// Let calleeContext be PrepareForOrdinaryCall(F, newTarget).
	// Assert: calleeContext is now the running execution context.
	// If kind is "base", perform OrdinaryCallBindThis(F, calleeContext, thisArgument).
	// Let constructorEnv be the LexicalEnvironment of calleeContext.
	// Let envRec be constructorEnv's EnvironmentRecord.
	// Let result be OrdinaryCallEvaluateBody(F, argumentsList).
	let result = executeWithCompletion(() => new (this.bind(thisArgument, ...argArray))());
	// Remove calleeContext from the execution context stack and restore callerContext as the running execution context.
	// If result.[[Type]] is return, then
	if (result["[[Type]]"] === "return" || result["[[Type]]"] === "normal") {
		// If Type(result.[[Value]]) is Object, return NormalCompletion(result.[[Value]]).
		if (Type(result["[[Value]]"]) === "Object") {
			return NormalCompletion(result["[[Value]]"])["[[Value]]"] as InstanceType<F>;
		}
		// If kind is "base", return NormalCompletion(thisArgument).
		if (kind === "base") {
			return NormalCompletion(thisArgument)["[[Value]]"] as InstanceType<F>;
		}

		// If result.[[Value]] is not undefined, throw a TypeError exception.
		if (result["[[Value]]"] !== undefined) {
			throw new TypeError();
		}
	}

	// Else, ReturnIfAbrupt(result).
	else {
		if (IsAbruptCompletion(result)) {
			throw result["[[Value]]"];
		} else if (IsCompletion(result)) {
			result = (result["[[Value]]"]!) as Completion<void>;
		}
	}
	// Return ? envRec.GetThisBinding().
	return this as InstanceType<F>;
}
