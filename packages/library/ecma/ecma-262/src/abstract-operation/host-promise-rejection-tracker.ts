import {InternalPromise} from "../type/internal-promise";

/**
 * https://tc39.es/ecma262/#sec-host-promise-rejection-tracker
 * @param {InternalPromise<T>} promise
 * @param {"reject" | "handle"} _operation
 * @constructor
 */
export function HostPromiseRejectionTracker<T>(promise: InternalPromise<T>, _operation: "reject" | "handle"): void {
	console.error(`Uncaught (in Promise)`, ...("[[PromiseResult]]" in promise ? [promise["[[PromiseResult]]"]] : []));
	if (typeof dispatchEvent !== "undefined" && typeof PromiseRejectionEvent !== "undefined") {
		dispatchEvent(new PromiseRejectionEvent("unhandledrejection", {promise}));
	}
}
