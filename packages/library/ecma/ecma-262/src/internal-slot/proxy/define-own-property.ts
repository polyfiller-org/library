import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {IsCompatiblePropertyDescriptor} from "../../abstract-operation/is-compatible-property-descriptor";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {FromPropertyDescriptor} from "../../abstract-operation/from-property-descriptor";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc
 * @private
 */
export function __ProxyDefineOwnProperty__<T extends {}>(this: T, P: PropertyKey, Desc: InternalPropertyDescriptor) {
	let settingConfigFalse: boolean;

	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);

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

	// Let trap be ? GetMethod(handler, "defineProperty").
	const trap = GetMethod(handler, "defineProperty");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[DefineOwnProperty]](P, Desc).
		return internals(target)["[[DefineOwnProperty]]"](P, Desc);
	}

	// Let descObj be FromPropertyDescriptor(Desc).
	const descObj = FromPropertyDescriptor(Desc);

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target, P, descObj »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target, P, descObj)));

	// If booleanTrapResult is false, return false.
	if (booleanTrapResult === false) {
		return false;
	}

	// Let targetDesc be ? target.[[GetOwnProperty]](P).
	const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

	// Let extensibleTarget be ? IsExtensible(target).
	const extensibleTarget = IsExtensible(target);

	// If Desc has a [[Configurable]] field and if Desc.[[Configurable]] is false, then
	if ("[[Configurable]]" in Desc && Desc["[[Configurable]]"] === false) {
		// Let settingConfigFalse be true.
		settingConfigFalse = true;
	}

	// Else, let settingConfigFalse be false.
	else {
		settingConfigFalse = false;
	}

	// If targetDesc is undefined, then
	if (targetDesc === undefined) {
		// If extensibleTarget is false, throw a TypeError exception.
		if (extensibleTarget === false) {
			throw new TypeError();
		}

		// If settingConfigFalse is true, throw a TypeError exception.
		if (settingConfigFalse === true) {
			throw new TypeError();
		}
	}

	// Else,
	else {
		// If IsCompatiblePropertyDescriptor(extensibleTarget, Desc, targetDesc) is false, throw a TypeError exception.
		if (IsCompatiblePropertyDescriptor(extensibleTarget, Desc, targetDesc) === false) {
			throw new TypeError();
		}

		// If settingConfigFalse is true and targetDesc.[[Configurable]] is true, throw a TypeError exception.
		if (settingConfigFalse === true && targetDesc["[[Configurable]]"] === true) {
			throw new TypeError();
		}
	}

	// Return true.
	return true;
}
