import {ToObject} from "../../abstract-operation/to-object";
import {internals} from "../../lib/internal-slot-map/internals";
import {Type} from "../../abstract-operation/type";
import {SameValue} from "../../abstract-operation/same-value";

/**
 * https://tc39.es/ecma262/#sec-object.prototype.isprototypeof
 */
export const {isPrototypeOf: objectPrototypeIsPrototypeOf} = {
	isPrototypeOf<T, TV>(this: T, V: TV): boolean {
		// If Type(V) is not Object, return false.
		if (Type(V) !== "Object") return false;

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Repeat,
		while (true) {
			// Set V to ? V.[[GetPrototypeOf]]().
			V = internals(V)["[[GetPrototypeOf]]"]() as TV;

			// If V is null, return false.
			if (V === null) return false;

			// If SameValue(O, V) is true, return true.
			if (SameValue(O, V) === true) return true;
		}
	}
};
