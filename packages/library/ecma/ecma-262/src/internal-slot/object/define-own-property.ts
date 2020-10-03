import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots-defineownproperty-p-desc
 */
export function __DefineOwnProperty__(this: {}, P: PropertyKey, Desc: InternalPropertyDescriptor) {
	// Return ? OrdinaryDefineOwnProperty(O, P, Desc).
	return OrdinaryDefineOwnProperty(this, P, Desc);
}
