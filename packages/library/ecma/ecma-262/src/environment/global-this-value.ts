/**
 * https://tc39.es/ecma262/#table-18
 * @return {*}
 * @constructor
 */
export function GlobalThisValue(): typeof globalThis {
	if (typeof globalThis !== "undefined") {
		return globalThis;
	}

	if (typeof self !== "undefined") {
		return (self as unknown) as typeof globalThis;
	} else if (typeof window !== "undefined") {
		return (window as unknown) as typeof globalThis;
	} else if (typeof global !== "undefined") {
		return (global as unknown) as typeof globalThis;
	} else {
		return Function("return this")();
	}
}
