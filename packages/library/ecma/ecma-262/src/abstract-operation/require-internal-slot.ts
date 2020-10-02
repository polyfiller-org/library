import {internals} from "../lib/internal-slot-map/internals";
import {Type} from "./type";

/**
 * The abstract operation RequireInternalSlot throws an exception unless O is
 * an Object and has the given internal slot.
 * https://tc39.es/ecma262/#sec-requireinternalslot
 */
export function RequireInternalSlot<O>(O: O, internalSlot: string): void {
	// If Type(O) is not Object, throw a TypeError exception.
	if (Type(O) !== "Object") {
		throw new TypeError();
	}

	// If O does not have an internalSlot internal slot, throw a TypeError exception.
	if (!(internalSlot in internals(O))) {
		throw new TypeError();
	}
}
