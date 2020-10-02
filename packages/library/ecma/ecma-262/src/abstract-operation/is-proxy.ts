import {internals} from "../lib/internal-slot-map/internals";

/**
 * @param {T} argument
 * @return {T}
 */
export function isProxy<T>(argument: T): argument is T {
	if (argument == null) return false;
	const internalMembers = internals(argument);
	return internalMembers["[[ProxyHandler]]"] !== undefined && internalMembers["[[ProxyTarget]]"] !== undefined;
}
