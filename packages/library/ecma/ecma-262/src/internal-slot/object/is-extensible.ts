import {OrdinaryIsExtensible} from "../../abstract-operation/ordinary-is-extensible";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-isextensible
 * @private
 */
export function __IsExtensible__(this: object) {
	// Return ! OrdinaryIsExtensible(O).
	return OrdinaryIsExtensible(this);
}
