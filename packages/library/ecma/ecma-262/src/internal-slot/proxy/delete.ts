import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-delete-p
 * @private
 */
export function __ProxyDelete__<T extends {}>(this: T, P: PropertyKey) {
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

	// Let trap be ? GetMethod(handler, "deleteProperty").
	const trap = GetMethod(handler, "deleteProperty");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[Delete]](P).
		return internals(target)["[[Delete]]"](P);
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target, P »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target, P)));

	// If booleanTrapResult is false, return false.
	if (booleanTrapResult === false) {
		return false;
	}

	// Let targetDesc be ? target.[[GetOwnProperty]](P).
	const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

	// If targetDesc is undefined, return true.
	if (targetDesc === undefined) {
		return true;
	}

	// If targetDesc.[[Configurable]] is false, throw a TypeError exception.
	if (targetDesc["[[Configurable]]"] === false) {
		throw new TypeError();
	}

	// Return true.
	return true;
}
