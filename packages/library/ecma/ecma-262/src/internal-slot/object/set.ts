import {OrdinarySet} from "../../abstract-operation/ordinary-set";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-set-p-v-receiver
 * @param {P} P
 * @param {V} V
 * @param {Receiver} Receiver
 * @returns {boolean}
 * @private
 */
export function __Set__<O, P extends keyof O, V extends O[P], Receiver>(this: O, P: P, V: V, Receiver: Receiver): boolean {
	// Return ? OrdinarySet(O, P, V, Receiver).
	return OrdinarySet(this, P, V, Receiver);
}
