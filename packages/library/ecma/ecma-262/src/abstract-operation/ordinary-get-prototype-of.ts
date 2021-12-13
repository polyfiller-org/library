import {internals} from "../lib/internal-slot-map/internals";

const NATIVE_GET_PROTOTYPE_OF = Object.getPrototypeOf != null && Object.getPrototypeOf.toString().indexOf("[native code]") >= 0 ? Object.getPrototypeOf : undefined;

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinarygetprototypeof
 */
export function OrdinaryGetPrototypeOf<TO extends {}>(O: TO): Object | null {
	let prototype: Object | null;

	// If Object.getPrototypeOf is supported, use it directly
	if (NATIVE_GET_PROTOTYPE_OF != null) {
		prototype = NATIVE_GET_PROTOTYPE_OF(O);
	} else {
		const proto = (O as unknown as {__proto__: typeof Object.prototype | null}).__proto__;
		if (proto !== undefined) {
			prototype = proto;
		} else if (typeof O.constructor === "function" && O instanceof O.constructor) {
			prototype = O.constructor.prototype;
		} else if (O instanceof Object) {
			prototype = Object.prototype;
		} else {
			prototype = null;
		}
	}

	internals(O)["[[Prototype]]"] = prototype;
	return prototype;
}
