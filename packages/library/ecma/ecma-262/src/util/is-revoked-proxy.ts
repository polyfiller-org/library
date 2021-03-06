import {internals} from "../lib/internal-slot-map/internals";

/**
 * Returns true if the given value represents a revoked proxy
 */
export function isRevokedProxy(value: {}): boolean {
	return internals(value)["[[ProxyHandler]]"] === null || internals(value)["[[ProxyTarget]]"] === null;
}
