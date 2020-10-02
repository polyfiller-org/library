import {OrdinaryOwnPropertyKeys} from "../../abstract-operation/ordinary-own-property-keys";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys
 * @private
 */
export function __OwnPropertyKeys__(this: object) {
	// Return ! OrdinaryOwnPropertyKeys(O).
	return OrdinaryOwnPropertyKeys(this);
}
