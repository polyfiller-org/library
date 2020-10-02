import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {CreateArrayFromList} from "../../abstract-operation/create-array-from-list";
import {Constructor} from "../../type/constructor";
import {IsConstructor} from "../../abstract-operation/is-constructor";
import {Construct} from "../../abstract-operation/construct";
import {List, makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-construct-argumentslist-newtarget
 * @private
 */
export function __ProxyConstruct__<T extends Constructor, NewTarget extends Constructor>(this: T, argumentsList: List, newTarget: NewTarget) {
	// Let handler be O.[[ProxyHandler]].
	const handler = internals(this)["[[ProxyHandler]]"];

	// If handler is null, throw a TypeError exception.
	if (handler === null) {
		throw new TypeError();
	}

	// Assert: Type(handler) is Object.
	assertType(handler, "Object");

	// Let target be O.[[ProxyTarget]].
	const target = internals(this)["[[ProxyTarget]]"]! as Constructor;

	// Assert: IsConstructor(target) is true.
	assert(IsConstructor(target));

	// Let trap be ? GetMethod(handler, "construct").
	const trap = GetMethod(handler, "construct");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? Construct(target, argumentsList, newTarget).
		return Construct(target, argumentsList, newTarget);
	}

	// Let argArray be ! CreateArrayFromList(argumentsList).
	const argArray = CreateArrayFromList(argumentsList);

	// Let newObj be ? Call(trap, handler, « target, argArray, newTarget »).
	const newObj = Call(trap, handler, makeList(target, argArray, newTarget));

	// If Type(newObj) is not Object, throw a TypeError exception.
	if (Type(newObj) !== "Object") {
		throw new TypeError();
	}

	// Return newObj.
	return newObj;
}
