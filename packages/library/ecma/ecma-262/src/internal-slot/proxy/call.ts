import {internals} from "../../lib/internal-slot-map/internals";
import {assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {ArbitraryFunction} from "../../type/arbitrary-function";
import {CreateArrayFromList} from "../../abstract-operation/create-array-from-list";
import {List, makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist
 * @private
 */
export function __ProxyCall__<T extends ArbitraryFunction, ThisArgument>(this: T, thisArgument: ThisArgument, argumentsList: List) {
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

	// Let trap be ? GetMethod(handler, "apply").
	const trap = GetMethod(handler, "apply");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? Call(target, thisArgument, argumentsList).
		return Call(target as FunctionConstructor, thisArgument, argumentsList);
	}

	// Let argArray be ! CreateArrayFromList(argumentsList).
	const argArray = CreateArrayFromList(argumentsList);

	// Return ? Call(trap, handler, « target, thisArgument, argArray »).
	return Call(trap, handler, makeList(target, thisArgument, argArray));
}
