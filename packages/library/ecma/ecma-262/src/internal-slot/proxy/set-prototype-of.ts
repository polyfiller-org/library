import {assert, assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {internals} from "../../lib/internal-slot-map/internals";
import {GetMethod} from "../../abstract-operation/get-method";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {SameValue} from "../../abstract-operation/same-value";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-setprototypeof-v
 * @private
 */
export function __ProxySetPrototypeOf__<T extends {}>(this: T, V: {} | null) {
	// Assert: Either Type(V) is Object or Type(V) is Null.
	assert(Type(V) === "Object" || Type(V) === "Null");

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

	// Let trap be ? GetMethod(handler, "setPrototypeOf").
	const trap = GetMethod(handler, "setPrototypeOf");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[SetPrototypeOf]](V).
		return internals(target)["[[SetPrototypeOf]]"](V);
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target, V »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target, V)));

	// If booleanTrapResult is false, return false.
	if (booleanTrapResult === false) return false;

	// Let extensibleTarget be ? IsExtensible(target).
	const extensibleTarget = IsExtensible(target);

	// If extensibleTarget is true, return true.
	if (extensibleTarget === true) return true;

	// Let targetProto be ? target.[[GetPrototypeOf]]().
	const targetProto = internals(target)["[[GetPrototypeOf]]"]();

	// If SameValue(V, targetProto) is false, throw a TypeError exception.
	if (SameValue(V, targetProto) === false) {
		throw new TypeError();
	}

	// Return true.
	return true;
}
