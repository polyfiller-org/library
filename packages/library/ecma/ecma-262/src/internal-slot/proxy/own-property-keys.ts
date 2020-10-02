import {internals} from "../../lib/internal-slot-map/internals";
import {assert, assertType} from "../../abstract-operation/assert";
import {GetMethod} from "../../abstract-operation/get-method";
import {Call} from "../../abstract-operation/call";
import {containsDuplicates} from "../../util/contains-duplicates";
import {IsExtensible} from "../../abstract-operation/is-extensible";
import {containsOnlyStringAndSymbolValues} from "../../util/contains-only-string-and-symbol-values";
import {CreateListFromArrayLike} from "../../abstract-operation/create-list-from-array-like";
import {copyList} from "../../util/copy-list";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
 * @private
 */
export function __ProxyOwnPropertyKeys__<T extends {}>(this: T) {
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

	// Let trap be ? GetMethod(handler, "ownKeys").
	const trap = GetMethod(handler, "ownKeys");

	// If trap is undefined, then
	if (trap === undefined) {
		// Return ? target.[[OwnPropertyKeys]]().
		return internals(target)["[[OwnPropertyKeys]]"]();
	}

	// Let trapResultArray be ? Call(trap, handler, « target »).
	const trapResultArray = Call(trap, handler, makeList(target));

	// Let trapResult be ? CreateListFromArrayLike(trapResultArray, « String, Symbol »).
	const trapResult = CreateListFromArrayLike(trapResultArray, makeList("String" as const, "Symbol" as const));

	// If trapResult contains any duplicate entries, throw a TypeError exception.
	if (containsDuplicates(trapResult)) {
		throw new TypeError(`Own property keys must not include duplicates`);
	}

	// Let extensibleTarget be ? IsExtensible(target).
	const extensibleTarget = IsExtensible(target);

	// Let targetKeys be ? target.[[OwnPropertyKeys]]().
	const targetKeys = internals(target)["[[OwnPropertyKeys]]"]();

	// Assert: targetKeys is a List containing only String and Symbol values.
	assert(containsOnlyStringAndSymbolValues(targetKeys));

	// Assert: targetKeys contains no duplicate entries.
	assert(!containsDuplicates(targetKeys));

	// Let targetConfigurableKeys be a new empty List.
	const targetConfigurableKeys = makeList<string | symbol>();

	// Let targetNonconfigurableKeys be a new empty List.
	const targetNonconfigurableKeys = makeList<string | symbol>();

	// For each element key of targetKeys, do
	for (let i = 0; i < targetKeys.length; i++) {
		const key = targetKeys.get(i) as string | symbol;

		// Let desc be ? target.[[GetOwnProperty]](key).
		const desc = internals(target)["[[GetOwnProperty]]"](key);

		// If desc is not undefined and desc.[[Configurable]] is false, then
		if (desc !== undefined && desc["[[Configurable]]"] === false) {
			// Append key as an element of targetNonconfigurableKeys.
			targetNonconfigurableKeys.append(key);
		}

		// Else,
		else {
			// Append key as an element of targetConfigurableKeys.
			targetConfigurableKeys.append(key);
		}
	}

	// If extensibleTarget is true and targetNonconfigurableKeys is empty, then
	if (extensibleTarget === true && targetNonconfigurableKeys.length === 0) {
		// Return trapResult.
		return trapResult;
	}

	// Let uncheckedResultKeys be a new List which is a copy of trapResult.
	const uncheckedResultKeys = copyList(trapResult);

	// For each key that is an element of targetNonconfigurableKeys, do
	for (let i = 0; i < targetNonconfigurableKeys.length; i++) {
		const key = targetNonconfigurableKeys.get(i);

		// If key is not an element of uncheckedResultKeys, throw a TypeError exception.
		const uncheckedResultKeysKeyIndex = uncheckedResultKeys.indexOf(key);
		if (uncheckedResultKeysKeyIndex === -1) {
			throw new TypeError();
		}

		// Remove key from uncheckedResultKeys.
		uncheckedResultKeys.delete(key);
	}

	// If extensibleTarget is true, return trapResult.
	if (extensibleTarget === true) {
		return trapResult;
	}

	// For each key that is an element of targetConfigurableKeys, do
	for (let i = 0; i < targetConfigurableKeys.length; i++) {
		const key = targetConfigurableKeys.get(i);

		// If key is not an element of uncheckedResultKeys, throw a TypeError exception.
		const uncheckedResultKeysKeyIndex = uncheckedResultKeys.indexOf(key);
		if (uncheckedResultKeysKeyIndex === -1) {
			throw new TypeError();
		}

		// Remove key from uncheckedResultKeys.
		// Note that Array.prototype.splice is part of ES3, so we can use it directly here
		uncheckedResultKeys.delete(key);
	}

	// If uncheckedResultKeys is not empty, throw a TypeError exception.
	if (uncheckedResultKeys.length !== 0) {
		throw new TypeError();
	}

	// Return trapResult.
	return trapResult;
}
