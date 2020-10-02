import {ToObject} from "../../abstract-operation/to-object";
import {ToPropertyKey} from "../../abstract-operation/to-property-key";
import {internals} from "../../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
 */
export const {propertyIsEnumerable: objectPrototypePropertyIsEnumerable} = {
	propertyIsEnumerable<T>(this: T, V: PropertyKey): boolean {
		// Let P be ? ToPropertyKey(V).
		const P = ToPropertyKey(V);

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let desc be ? O.[[GetOwnProperty]](P).
		const desc = internals(O)["[[GetOwnProperty]]"](P);

		// If desc is undefined, return false.
		if (desc === undefined) return false;

		// Return desc.[[Enumerable]].
		return desc["[[Enumerable]]"] === true;
	}
};
