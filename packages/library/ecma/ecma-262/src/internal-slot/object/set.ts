import {OrdinarySet} from "../../abstract-operation/ordinary-set";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-set-p-v-receiver
 */
export function __Set__<TO, TP extends keyof TO, TV extends TO[TP], TReceiver>(this: TO, P: TP, V: TV, Receiver: TReceiver): boolean {
	// Return ? OrdinarySet(O, P, V, Receiver).
	return OrdinarySet(this, P, V, Receiver);
}
