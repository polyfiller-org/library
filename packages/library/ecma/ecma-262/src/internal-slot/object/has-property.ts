import {OrdinaryHasProperty} from "../../abstract-operation/ordinary-has-property";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-hasproperty-p
 */
export function __HasProperty__(this: object, P: PropertyKey) {
	// Return ? OrdinaryHasProperty(O, P).
	return OrdinaryHasProperty(this, P);
}
