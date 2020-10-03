import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-getownproperty-p
 */
export function __GetOwnProperty__<T extends {}>(this: T, P: PropertyKey) {
	// Return ! OrdinaryGetOwnProperty(O, P).
	return OrdinaryGetOwnProperty(this, P);
}
