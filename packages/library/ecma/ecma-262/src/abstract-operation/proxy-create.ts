import {OrdinaryDefineOwnProperty} from "./ordinary-define-own-property";
import {ObjectCreate} from "./object-create";
import {internals, setInternals} from "../lib/internal-slot-map/internals";
import {Type} from "./type";
import {isProxy} from "./is-proxy";
import {makeList} from "../lib/list/list";

const OLD_PROXY = typeof Proxy === "undefined" ? undefined : Proxy;

/**
 * The abstract operation ProxyCreate with arguments target and handler is used to specify
 * the creation of new Proxy exotic objects.
 * https://tc39.es/ecma262/#sec-proxycreate
 */
export function ProxyCreate<T extends object>(target: T, handler: ProxyHandler<T>): T {
	// If Type(target) is not Object, throw a TypeError exception.
	if (Type(target) !== "Object") {
		throw new TypeError(`Cannot create proxy with a non-object as target or handler`);
	}

	// If target is a Proxy exotic object and target.[[ProxyHandler]] is null, throw a TypeError exception.
	if (isProxy(target) && internals(target)["[[ProxyHandler]]"] === null) {
		throw new TypeError(`Cannot create proxy with a revoked proxy as target or handler`);
	}

	// If Type(handler) is not Object, throw a TypeError exception.
	if (Type(handler) !== "Object") {
		throw new TypeError(`Cannot create proxy with a non-object as target or handler`);
	}

	// If handler is a Proxy exotic object and handler.[[ProxyHandler]] is null, throw a TypeError exception.
	if (isProxy(handler) && internals(handler)["[[ProxyHandler]]"] === null) {
		throw new TypeError(`Cannot create proxy with a revoked proxy as target or handler`);
	}

	// Let P be a newly created Proxy exotic object with internal slots [[ProxyTarget]] and [[ProxyHandler]].
	let P: T;
	if (OLD_PROXY !== undefined) {
		P = new OLD_PROXY(target, handler);
	} else {
		P = ObjectCreate(null, makeList("[[ProxyTarget]]", "[[ProxyHandler]]"));
		OrdinaryDefineOwnProperty(P, Symbol.toStringTag, {
			"[[Value]]": "Proxy",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	// Set P's essential internal methods (except for [[Call]] and [[Construct]]) to the definitions specified in 9.5.
	// Set P.[[ProxyTarget]] to target.
	// Set P.[[ProxyHandler]] to handler.
	setInternals(P, "proxy", {
		"[[ProxyTarget]]": target,
		"[[ProxyHandler]]": handler
	});

	// Return P.
	return P;
}
