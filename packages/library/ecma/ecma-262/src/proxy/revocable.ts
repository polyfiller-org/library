import {ProxyCreate} from "../abstract-operation/proxy-create";
import {ProxyRevocationFunctions} from "../algorithm/proxy-revocation-functions";
import {CreateBuiltinFunction} from "../abstract-operation/create-builtin-function";
import {internals, setInternals} from "../lib/internal-slot-map/internals";
import {ObjectCreate} from "../abstract-operation/object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {CreateDataProperty} from "../abstract-operation/create-data-property";
import {makeList} from "../lib/list/list";

const OLD_PROXY_REVOCABLE = typeof Proxy === "undefined" || typeof Proxy.revocable === "undefined" ? undefined : Proxy.revocable;

export interface RevocableProxy<T extends object> {
	proxy: T;
	revoke(): void;
}

/**
 * The Proxy.revocable function is used to create a revocable Proxy object.
 * https://tc39.es/ecma262/#sec-proxy.revocable
 */
function revocable<T extends object>(target: T, handler: ProxyHandler<T>): RevocableProxy<T> {
	if (OLD_PROXY_REVOCABLE != null) {
		return revocableNative(target, handler);
	}

	// Let p be ? ProxyCreate(target, handler).
	const p = ProxyCreate(target, handler);

	// Let steps be the algorithm steps defined in Proxy Revocation Functions.
	const steps = ProxyRevocationFunctions;

	// Let revoker be ! CreateBuiltinFunction(steps, « [[RevocableProxy]] »).
	const revoker = CreateBuiltinFunction(steps, makeList("[[RevocableProxy]]"));

	// Set revoker.[[RevocableProxy]] to p.
	internals(revoker)["[[RevocableProxy]]"] = p;

	// Let result be ObjectCreate(%Object.prototype%).
	const result = ObjectCreate(getCurrentIntrinsics()["[[%ObjectPrototype%]]"]) as RevocableProxy<T>;

	// Perform CreateDataProperty(result, "proxy", p).
	CreateDataProperty(result, "proxy", p);

	// Perform CreateDataProperty(result, "revoke", revoker).
	CreateDataProperty(result, "revoke", revoker.bind(revoker));

	// Return result.
	return result;
}

/**
 * This is an implementation that follows the spec, but wraps the native implementation of Proxy.revocable that is available
 */
function revocableNative<T extends object>(target: T, handler: ProxyHandler<T>): RevocableProxy<T> {
	const result = OLD_PROXY_REVOCABLE!(target, handler);
	const nativeRevoke = result.revoke;

	// Let steps be the algorithm steps defined in Proxy Revocation Functions.
	const steps = function(this: Function) {
		nativeRevoke.call(result);
		ProxyRevocationFunctions.call(this);
	};

	// Let revoker be ! CreateBuiltinFunction(steps, « [[RevocableProxy]] »).
	const revoker = CreateBuiltinFunction(steps, makeList("[[RevocableProxy]]"));

	// Set revoker.[[RevocableProxy]] to p.
	internals(revoker)["[[RevocableProxy]]"] = result.proxy;

	// Perform CreateDataProperty(result, "proxy", p).
	CreateDataProperty(result, "proxy", result.proxy);

	// Perform CreateDataProperty(result, "revoke", revoker).
	CreateDataProperty(result, "revoke", revoker.bind(revoker));

	// Note: We'll also need to do this since ProxyCreate won't be triggered by the native Proxy.revocable
	setInternals(result.proxy, "proxy", {
		"[[ProxyTarget]]": target,
		"[[ProxyHandler]]": handler
	});

	// Return result.
	return result;
}

export {revocable as proxyRevocable, revocableNative as proxyRevocableNative};