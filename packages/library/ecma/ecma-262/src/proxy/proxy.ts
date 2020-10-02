import {ProxyCreate} from "../abstract-operation/proxy-create";

/**
 * https://tc39.es/ecma262/#sec-regexp-pattern-flags
 */
export const {Proxy: ProxyConstructor} = {
	Proxy: function <T extends object>(target: T, handler: ProxyHandler<T>): T {
		// If NewTarget is undefined, throw a TypeError exception.
		if (new.target === undefined) {
			throw new TypeError(`Constructor Proxy requires 'new'`);
		}

		// Return ? ProxyCreate(target, handler).
		return ProxyCreate(target, handler);
	}
};
