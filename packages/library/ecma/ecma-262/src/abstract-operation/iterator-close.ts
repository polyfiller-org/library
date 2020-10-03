import {Type} from "./type";
import {assert, assertType} from "./assert";
import {IteratorRecord} from "./get-iterator";
import {Completion} from "../type/completion";
import {IsCompletion} from "./is-completion";
import {GetMethod} from "./get-method";
import {Call} from "./call";

/**
 * https://tc39.es/ecma262/#sec-iteratorclose
 */
export function IteratorClose<T>(iteratorRecord: IteratorRecord<T>, completion: Completion): T[] {
	// Assert: Type(iteratorRecord.[[Iterator]]) is Object.
	assertType(iteratorRecord["[[Iterator]]"], "Object");

	// Assert: completion is a Completion Record.
	assert(IsCompletion(completion));

	// Let iterator be iteratorRecord.[[Iterator]].
	const iterator = iteratorRecord["[[Iterator]]"];

	// Let return be ? GetMethod(iterator, "return").
	const _return = GetMethod(iterator, "return");

	// If return is undefined, return Completion(completion).
	if (_return === undefined) {
		switch (completion["[[Type]]"]) {
			case "normal":
				return completion["[[Value]]"] as T[];
			default:
				throw completion["[[Value]]"];
		}
	}

	// Let innerResult be Call(return, iterator).
	const innerResult = Call(_return, iterator) as IteratorResult<T>;

	// If completion.[[Type]] is throw, return Completion(completion).
	if (completion["[[Type]]"] === "throw") {
		throw completion["[[Value]]"];
	}

	// TODO: Add this in when IteratorResult has an internal implementation with access to InternalSlots
	// If innerResult.[[Type]] is throw, return Completion(innerResult).
	// if (innerResult["[[Type]]"] === "throw") {
	//
	//	return {
	//		...innerResult
	//	};
	// }

	// If Type(innerResult.[[Value]]) is not Object, throw a TypeError exception.
	if (Type(innerResult.value) !== "Object") {
		throw new TypeError();
	}

	// Return Completion(completion).
	switch (completion["[[Type]]"]) {
		case "normal":
			return completion["[[Value]]"] as T[];
		default:
			throw completion["[[Value]]"];
	}
}
