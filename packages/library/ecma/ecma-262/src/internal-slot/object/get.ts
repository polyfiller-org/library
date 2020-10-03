import {OrdinaryGet} from "../../abstract-operation/ordinary-get";

/**
 * https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver
 */
export function __Get__<TO, TP extends keyof TO, TReceiver>(this: TO, P: TP, Receiver?: TReceiver): TO[TP];
export function __Get__<TO, TP extends PropertyKey, TReceiver>(this: TO, P: TP, Receiver?: TReceiver): TO[keyof TO] | undefined;
export function __Get__<TO, TP extends PropertyKey | keyof TO, TReceiver>(this: TO, P: TP, Receiver?: TReceiver): TO[keyof TO] | undefined {
	// Return ? OrdinaryGet(O, P, Receiver).
	return OrdinaryGet(this, P, Receiver);
}
