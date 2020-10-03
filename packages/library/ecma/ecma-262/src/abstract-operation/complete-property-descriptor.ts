import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {assert} from "./assert";
import {IsGenericDescriptor} from "./is-generic-descriptor";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsPropertyDescriptor} from "./is-property-descriptor";

/**
 * https://tc39.es/ecma262/#sec-completepropertydescriptor
 */
export function CompletePropertyDescriptor(Desc: InternalPropertyDescriptor): InternalPropertyDescriptor {
	// Assert: Desc is a Property Descriptor.
	assert(IsPropertyDescriptor(Desc));

	// Let like be the Record { [[Value]]: undefined, [[Writable]]: false, [[Get]]: undefined, [[Set]]: undefined, [[Enumerable]]: false, [[Configurable]]: false }.
	const like = {
		"[[Value]]": undefined,
		"[[Writable]]": false,
		"[[Get]]": undefined,
		"[[Set]]": undefined,
		"[[Enumerable]]": false,
		"[[Configurable]]": false
	};

	// If IsGenericDescriptor(Desc) is true or IsDataDescriptor(Desc) is true, then
	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		// If Desc does not have a [[Value]] field, set Desc.[[Value]] to like.[[Value]].
		if (!("[[Value]]" in Desc)) {
			Desc["[[Value]]"] = like["[[Value]]"];
		}

		// If Desc does not have a [[Writable]] field, set Desc.[[Writable]] to like.[[Writable]].
		if (!("[[Writable]]" in Desc)) {
			Desc["[[Writable]]"] = like["[[Writable]]"];
		}
	}

	// Else,
	else {
		// If Desc does not have a [[Get]] field, set Desc.[[Get]] to like.[[Get]].
		if (!("[[Get]]" in Desc)) {
			Desc["[[Get]]"] = like["[[Get]]"] as never;
		}

		// If Desc does not have a [[Set]] field, set Desc.[[Set]] to like.[[Set]].
		if (!("[[Set]]" in Desc)) {
			Desc["[[Set]]"] = like["[[Set]]"] as never;
		}
	}

	// If Desc does not have an [[Enumerable]] field, set Desc.[[Enumerable]] to like.[[Enumerable]].
	if (!("[[Enumerable]]" in Desc)) {
		Desc["[[Enumerable]]"] = like["[[Enumerable]]"];
	}

	// If Desc does not have a [[Configurable]] field, set Desc.[[Configurable]] to like.[[Configurable]].
	if (!("[[Configurable]]" in Desc)) {
		Desc["[[Configurable]]"] = like["[[Configurable]]"];
	}

	// Return Desc.
	return Desc;
}
