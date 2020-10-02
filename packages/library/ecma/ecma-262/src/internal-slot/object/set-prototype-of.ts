import {OrdinarySetPrototypeOf} from "../../abstract-operation/ordinary-set-prototype-of";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-setprototypeof-v
 * @private
 */
export function __SetPrototypeOf__<T extends {}>(this: T, V: {} | null) {
	// Return ! OrdinarySetPrototypeOf(O, V).
	return OrdinarySetPrototypeOf(this, V);
}
