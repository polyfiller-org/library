import {internals} from "../lib/internal-slot-map/internals";
import {assert} from "../abstract-operation/assert";
import {isProxy} from "../abstract-operation/is-proxy";

/**
 * A Proxy revocation function is an anonymous function that has the ability to invalidate a specific Proxy object.
 * Each Proxy revocation function has a [[RevocableProxy]] internal slot.
 * https://tc39.es/ecma262/#sec-proxy-revocation-functions
 * @returns
 * @constructor
 */
export function ProxyRevocationFunctions(this: Function) {
	// Let F be the active function object.
	const F = this;

	// Let p be F.[[RevocableProxy]].
	const p = internals(F)["[[RevocableProxy]]"];

	// If p is null, return undefined.
	if (p === null) return undefined;

	// Set F.[[RevocableProxy]] to null.
	internals(F)["[[RevocableProxy]]"] = null;

	// Assert: p is a Proxy object.
	assert(isProxy(p));

	// Set p.[[ProxyTarget]] to null.
	internals(p)["[[ProxyTarget]]"] = null;

	// Set p.[[ProxyHandler]] to null.
	internals(p)["[[ProxyHandler]]"] = null;

	// Return undefined.
	return undefined;
}
