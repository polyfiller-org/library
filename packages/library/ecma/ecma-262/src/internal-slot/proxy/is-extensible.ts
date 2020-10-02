import {internals} from "../../lib/internal-slot-map/internals";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {SameValue} from "../../abstract-operation/same-value";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {makeList} from "../../lib/list/list";
import {assertType} from "../../abstract-operation/assert";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-isextensible
 * @private
 */
export function __ProxyIsExtensible__<T extends {}>(this: T) {
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

	// Let trap be ? GetMethod(handler, "isExtensible").
	const trap = GetMethod(handler, "isExtensible");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? IsExtensible(target).
		return IsExtensible(target);
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target)));

	// Let targetResult be ? IsExtensible(target).
	const targetResult = IsExtensible(target);

	// If SameValue(booleanTrapResult, targetResult) is false, throw a TypeError exception.
	if (SameValue(booleanTrapResult, targetResult) === false) {
		throw new TypeError();
	}

	// Return booleanTrapResult.
	return booleanTrapResult;
}
