import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {IsCompatiblePropertyDescriptor} from "../../abstract-operation/is-compatible-property-descriptor";
import {ToPropertyDescriptor} from "../../abstract-operation/to-property-descriptor";
import {CompletePropertyDescriptor} from "../../abstract-operation/complete-property-descriptor";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-getownproperty-p
 * @private
 */
export function __ProxyGetOwnProperty__<T extends {}>(this: T, P: PropertyKey) {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);
	let extensibleTarget: boolean;

	// Let handler be O.[[ProxyHandler]].
	const handler = internals(this)["[[ProxyHandler]]"];

	// If handler is null, throw a TypeError exception.
	if (handler === null) {
		throw new TypeError();
	}

	// Assert: Type(handler) is Object.
	assertType(handler, "Object");

	// Let target be O.[[ProxyTarget]].
	const target = internals(this)["[[ProxyTarget]]"]!;

	// Let trap be ? GetMethod(handler, "getOwnPropertyDescriptor").
	const trap = GetMethod(handler, "getOwnPropertyDescriptor");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[GetOwnProperty]](P).
		return internals(target)["[[GetOwnProperty]]"](P);
	}

	// Let trapResultObj be ? Call(trap, handler, « target, P »).
	const trapResultObj = Call(trap, handler, makeList(target, P));

	// If Type(trapResultObj) is neither Object nor Undefined, throw a TypeError exception.
	if (Type(trapResultObj) !== "Object" && Type(trapResultObj) !== "Undefined") {
		throw new TypeError();
	}

	// Let targetDesc be ? target.[[GetOwnProperty]](P).
	const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

	// If trapResultObj is undefined, then
	if (trapResultObj === undefined) {
		// If targetDesc is undefined, return undefined.
		if (targetDesc === undefined) {
			return undefined;
		}

		// If targetDesc.[[Configurable]] is false, throw a TypeError exception.
		if (targetDesc["[[Configurable]]"] === false) {
			throw new TypeError();
		}

		// Let extensibleTarget be ? IsExtensible(target).
		extensibleTarget = IsExtensible(target);

		// If extensibleTarget is false, throw a TypeError exception.
		if (extensibleTarget === false) {
			throw new TypeError();
		}

		// Return undefined.
		return undefined;
	}

	// Let extensibleTarget be ? IsExtensible(target).
	extensibleTarget = IsExtensible(target);

	// Let resultDesc be ? ToPropertyDescriptor(trapResultObj).
	const resultDesc = ToPropertyDescriptor(trapResultObj);

	// Call CompletePropertyDescriptor(resultDesc).
	CompletePropertyDescriptor(resultDesc);

	// Let valid be IsCompatiblePropertyDescriptor(extensibleTarget, resultDesc, targetDesc).
	const valid = IsCompatiblePropertyDescriptor(extensibleTarget, resultDesc, targetDesc);

	// If valid is false, throw a TypeError exception.
	if (valid === false) {
		throw new TypeError();
	}

	// If resultDesc.[[Configurable]] is false, then
	if (resultDesc["[[Configurable]]"] === false) {
		// If targetDesc is undefined or targetDesc.[[Configurable]] is true, then
		if (targetDesc === undefined || targetDesc["[[Configurable]]"] === true) {
			throw new TypeError();
		}
	}

	// Return resultDesc.
	return resultDesc;
}
