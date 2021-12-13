import {internals} from "../lib/internal-slot-map/internals";
import {assert} from "./assert";
import {Type} from "./type";
import {SameValue} from "./same-value";
import {__GetPrototypeOf__} from "../internal-slot/object/get-prototype-of";

const SUPPORTS_PROTO = {__proto__: []} instanceof Array;
const NATIVE_SET_PROTOTYPE_OF = Object.setPrototypeOf?.toString().indexOf("[native code]") >= 0 ? Object.setPrototypeOf : undefined;

/**
 * https://tc39.es/ecma262/#sec-ordinarysetprototypeof
 */
export function OrdinarySetPrototypeOf<TO extends {}>(O: TO, V: {} | null): boolean {
	// If Object.getPrototypeOf is supported, use it directly
	if (NATIVE_SET_PROTOTYPE_OF != null) {
		NATIVE_SET_PROTOTYPE_OF(O, V);
		internals(O)["[[Prototype]]"] = V;
	}

	// Assert: Either Type(V) is Object or Type(V) is Null.
	assert(Type(V) === "Object" || Type(V) === "Null");

	// Let current be O.[[Prototype]].
	const current = internals(O)["[[Prototype]]"];

	// If SameValue(V, current) is true, return true.
	if (SameValue(V, current)) return true;

	// Let extensible be O.[[Extensible]].
	const extensible = internals(O)["[[Extensible]]"];

	// If extensible is false, return false.
	if (extensible === false) return false;

	// Let p be V.
	let p = V;

	// Let done be false.
	let done = false;

	// Repeat, while done is false,
	while (done === false) {
		// If p is null, set done to true.
		if (p === null) done = true;
		// Else if SameValue(p, O) is true, return false.
		else if (SameValue(p, O)) return false;
		// Else,
		else {
			// If p.[[GetPrototypeOf]] is not the ordinary object internal method defined in 9.1.1, set done to true.
			if (internals(p)["[[GetPrototypeOf]]"] !== __GetPrototypeOf__) {
				done = true;
			}

			// Else, set p to p.[[Prototype]].
			else p = internals(p)["[[Prototype]]"];
		}
	}

	// Set O.[[Prototype]] to V.
	internals(O)["[[Prototype]]"] = V;

	if (SUPPORTS_PROTO) {
		(O as unknown as {__proto__: typeof V}).__proto__ = V;
	}

	// Return true.
	return true;
}
