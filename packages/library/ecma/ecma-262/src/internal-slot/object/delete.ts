import {OrdinaryDelete} from "../../abstract-operation/ordinary-delete";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-delete-p
 * @param {PropertyKey} P
 * @private
 */
export function __Delete__<O, P extends PropertyKey>(this: O, P: P): boolean {
	// Return ? OrdinaryDelete(O, P).
	return OrdinaryDelete(this, P);
}
