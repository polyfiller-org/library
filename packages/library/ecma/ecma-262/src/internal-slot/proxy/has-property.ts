import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-hasproperty-p
 * @private
 */
export function __ProxyHasProperty__<T extends {}>(this: T, P: PropertyKey) {
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

	// Let trap be ? GetMethod(handler, "has").
	const trap = GetMethod(handler, "has");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[HasProperty]](P).
		return internals(target)["[[HasProperty]]"](P);
	}

	// Let booleanTrapResult be ! ToBoolean(? Call(trap, handler, « target, P »)).
	const booleanTrapResult = ToBoolean(Call(trap, handler, makeList(target, P)));

	// If booleanTrapResult is false, then
	if (booleanTrapResult === false) {
		// Let targetDesc be ? target.[[GetOwnProperty]](P).
		const targetDesc = internals(target)["[[GetOwnProperty]]"](P);

		// If targetDesc is not undefined, then
		if (targetDesc !== undefined) {
			// If targetDesc.[[Configurable]] is false, throw a TypeError exception.
			if (targetDesc["[[Configurable]]"] === false) {
				throw new TypeError();
			}

			// Let extensibleTarget be ? IsExtensible(target).
			const extensibleTarget = IsExtensible(target);

			// If extensibleTarget is false, throw a TypeError exception.
			if (extensibleTarget === false) {
				throw new TypeError();
			}
		}
	}

	// Return booleanTrapResult.
	return booleanTrapResult;
}
