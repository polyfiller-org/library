import {Type} from "./type";
import {isRevokedProxy} from "../util/is-revoked-proxy";

const NATIVE_IS_ARRAY = Array.isArray?.toString().indexOf("[native code]") >= 0 ? Array.isArray : undefined;

/**
 * https://tc39.es/ecma262/#sec-isarray
 */
export function IsArray<T>(argument: readonly T[], _skipRevokedProxyCheck?: boolean): argument is readonly T[];
export function IsArray<T>(argument: T[], _skipRevokedProxyCheck?: boolean): argument is T[];
export function IsArray<T>(argument: readonly T[] | T[], _skipRevokedProxyCheck?: boolean): argument is readonly T[] | T[];
export function IsArray<T>(argument: readonly T[] | T[] | T, _skipRevokedProxyCheck?: boolean): argument is readonly T[] | T[];
export function IsArray<T>(argument: T[] | T, _skipRevokedProxyCheck?: boolean): argument is T[];
export function IsArray<T>(argument: T[] | T, _skipRevokedProxyCheck = false): argument is T[] {
	if (NATIVE_IS_ARRAY != null) {
		return NATIVE_IS_ARRAY(argument);
	}

	// If Type(argument) is not Object, return false.
	if (Type(argument) !== "Object") return false;

	// If argument is an Array exotic object, return true.
	// If argument is a Proxy exotic object, then
	// If argument.[[ProxyHandler]] is null, throw a TypeError exception.
	if (!_skipRevokedProxyCheck && isRevokedProxy(argument)) {
		throw new TypeError(`Cannot perform 'IsArray' on a proxy that has been revoked`);
	}

	// Let target be argument.[[ProxyTarget]].
	// Return ? IsArray(target).
	// Return false.
	return Object.prototype.toString.call(argument) === "[object Array]";
}
