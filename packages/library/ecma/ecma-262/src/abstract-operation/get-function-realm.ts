import {assert} from "./assert";
import {IsCallable} from "./is-callable";
import {getRealmRecordFromSeed} from "../environment/realm/get-realm-record-from-seed";
import {Realm} from "../environment/realm/realm";
import {internals} from "../lib/internal-slot-map/internals";
import {isProxy} from "./is-proxy";

/**
 * https://tc39.es/ecma262/#sec-getfunctionrealm
 * @constructor
 */
export function GetFunctionRealm(obj: any): Realm {
	// Assert: ! IsCallable(obj) is true.
	assert(IsCallable(obj));

	// If obj has a [[Realm]] internal slot, then use that
	const internalRealm = internals(obj as Function)["[[Realm]]"];
	if (internalRealm !== undefined) {
		return internalRealm;
	}

	// If obj is a Bound Function exotic object, then
	// Let target be obj.[[BoundTargetFunction]].
	// Return ? GetFunctionRealm(target).

	// If obj is a Proxy exotic object, then
	if (isProxy(obj)) {
		// If obj.[[ProxyHandler]] is null, throw a TypeError exception.
		if (internals(obj)["[[ProxyHandler]]"] === null) {
			throw new TypeError();
		}

		// Let proxyTarget be obj.[[ProxyTarget]].
		const proxyTarget = internals(obj)["[[ProxyTarget]]"];

		// Return ? GetFunctionRealm(proxyTarget).
		return GetFunctionRealm(proxyTarget);
	}

	// Return the current Realm Record.
	return getRealmRecordFromSeed(obj);
}
