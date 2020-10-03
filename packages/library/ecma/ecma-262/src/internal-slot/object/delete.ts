import {OrdinaryDelete} from "../../abstract-operation/ordinary-delete";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-delete-p
 */
export function __Delete__<TO, TP extends PropertyKey>(this: TO, P: TP): boolean {
	// Return ? OrdinaryDelete(O, P).
	return OrdinaryDelete(this, P);
}
