import {internals} from "../../lib/internal-slot-map/internals";
import {assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-preventextensions
 * @private
 */
export function __ProxyPreventExtensions__<T extends {}>(this: T) {
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

	// Let trap be ? GetMethod(handler, "preventExtensions").
	const trap = GetMethod(handler, "preventExtensions");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[PreventExtensions]]().
		return internals(target)["[[PreventExtensions]]"]();
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target)));

	// If booleanTrapResult is true, then
	if (booleanTrapResult === true) {
		// Let extensibleTarget be ? IsExtensible(target).
		const extensibleTarget = IsExtensible(target);

		// If extensibleTarget is true, throw a TypeError exception.
		if (extensibleTarget === true) {
			throw new TypeError();
		}
	}

	// Return booleanTrapResult.
	return booleanTrapResult;
}
