import {OrdinaryGet} from "../../abstract-operation/ordinary-get";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver
 * @param {PropertyKey} P
 * @param {Receiver} [Receiver]
 * @private
 */
export function __Get__<O, P extends keyof O, Receiver>(this: O, P: P, Receiver?: Receiver): O[P];
export function __Get__<O, P extends PropertyKey, Receiver>(this: O, P: P, Receiver?: Receiver): O[keyof O] | undefined;
export function __Get__<O, P extends PropertyKey | keyof O, Receiver>(this: O, P: P, Receiver?: Receiver): O[keyof O] | undefined {
	// Return ? OrdinaryGet(O, P, Receiver).
	return OrdinaryGet(this, P, Receiver);
}
