import {OrdinaryGetPrototypeOf} from "../../abstract-operation/ordinary-get-prototype-of";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-getprototypeof
 * @private
 */
export function __GetPrototypeOf__<T extends {}>(this: T) {
	// Return ! OrdinaryGetPrototypeOf(O).
	return OrdinaryGetPrototypeOf(this);
}
