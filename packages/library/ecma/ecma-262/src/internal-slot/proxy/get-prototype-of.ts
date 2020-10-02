import {internals} from "../../lib/internal-slot-map/internals";
import {assertType} from "../../abstract-operation/assert";
import {Type} from "../../abstract-operation/type";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {SameValue} from "../../abstract-operation/same-value";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-getprototypeof
 * @private
 */
export function __ProxyGetPrototypeOf__<T extends {}>(this: T) {
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

	// Let trap be ? GetMethod(handler, "getPrototypeOf").
	const trap = GetMethod(handler, "getPrototypeOf");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[GetPrototypeOf]]().
		return internals(target)["[[GetPrototypeOf]]"]();
	}

	// Let handlerProto be ? Call(trap, handler, « target »).
	const handlerProto = Call(trap, handler, makeList(target));

	// If Type(handlerProto) is neither Object nor Null, throw a TypeError exception.
	if (Type(handlerProto) !== "Object" && Type(handlerProto) !== "Number") {
		throw new TypeError();
	}

	// Let extensibleTarget be ? IsExtensible(target).
	const extensibleTarget = IsExtensible(target);

	// If extensibleTarget is true, return handlerProto.
	if (extensibleTarget === true) {
		return handlerProto;
	}

	// Let targetProto be ? target.[[GetPrototypeOf]]().
	const targetProto = internals(target)["[[GetPrototypeOf]]"]();

	// If SameValue(handlerProto, targetProto) is false, throw a TypeError exception.
	if (SameValue(handlerProto, targetProto) === false) {
		throw new TypeError();
	}

	// Return handlerProto.
	return handlerProto;
}
