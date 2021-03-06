import {assert} from "./assert";
import {IsPropertyKey} from "./is-property-key";
import {Type} from "./type";
import {IsDataDescriptor} from "./is-data-descriptor";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {CreateDataProperty} from "./create-data-property";
import {Call} from "./call";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";
import {makeList} from "../lib/list/list";
import {safeHasOwnProperty} from "../util/safe-has-own-property";

/**
 * https://tc39.es/ecma262/#sec-ordinarysetwithowndescriptor
 */
export function OrdinarySetWithOwnDescriptor<TO, TP extends keyof TO, TV extends TO[TP], TReceiver>(
	O: TO,
	P: TP,
	V: TV,
	Receiver: TReceiver,
	ownDesc: InternalPropertyDescriptor | undefined
): O is TO & {[Key in TP]: TV} {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 1 must be a PropertyKey`, TypeError);

	// If ownDesc is undefined, then
	if (ownDesc === undefined) {
		// Let parent be ? O.[[GetPrototypeOf]]().
		const parent = internals(O)["[[GetPrototypeOf]]"]();
		// If parent is not null, then
		if (parent !== null) {
			// Return ? parent.[[Set]](P, V, Receiver).
			const parentInternals = internals(parent);
			return parentInternals["[[Set]]"](P as keyof typeof parentInternals, V, Receiver);
		}

		// Else,
		else {
			// Set ownDesc to the PropertyDescriptor { [[Value]]: undefined, [[Writable]]: true,
			// [[Enumerable]]: true, [[Configurable]]: true }.
			ownDesc = {
				"[[Value]]": undefined,
				"[[Writable]]": true,
				"[[Enumerable]]": true,
				"[[Configurable]]": true
			};
		}
	}

	// If IsDataDescriptor(ownDesc) is true, then
	if (IsDataDescriptor(ownDesc)) {
		// If ownDesc.[[Writable]] is false, return false.
		if (ownDesc["[[Writable]]"] === false) return false;

		// If Type(Receiver) is not Object, return false.
		if (Type(Receiver) !== "Object") return false;

		// Let existingDescriptor be ? Receiver.[[GetOwnProperty]](P).
		const existingDescriptor = internals(Receiver)["[[GetOwnProperty]]"](P);

		// If existingDescriptor is not undefined, then
		if (existingDescriptor !== undefined) {
			// If IsAccessorDescriptor(existingDescriptor) is true, return false.
			if (IsAccessorDescriptor(existingDescriptor)) return false;

			// If existingDescriptor.[[Writable]] is false, return false.
			if (existingDescriptor["[[Writable]]"] === false) return false;

			// Let valueDesc be the PropertyDescriptor { [[Value]]: V }.
			const valueDesc: InternalPropertyDescriptor = {"[[Value]]": V};

			// Return ? Receiver.[[DefineOwnProperty]](P, valueDesc).
			return internals(Receiver)["[[DefineOwnProperty]]"](P, valueDesc);
		}

		// Else,
		else {
			// Assert: Receiver does not currently have a property P.
			assert(!safeHasOwnProperty(Receiver, P));

			// Return ? CreateDataProperty(Receiver, P, V).
			return CreateDataProperty(Receiver, P, V);
		}
	}

	// Assert: IsAccessorDescriptor(ownDesc) is true.
	assert(IsAccessorDescriptor(ownDesc));

	// Let setter be ownDesc.[[Set]].
	const setter = ownDesc["[[Set]]"];

	// If setter is undefined, return false.
	if (setter === undefined) return false;

	// Perform ? Call(setter, Receiver, « V »).
	Call(setter, Receiver, makeList(V));

	// Return true.
	return true;
}
