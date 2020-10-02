import {internals} from "../lib/internal-slot-map/internals";
import {List, makeList} from "../lib/list/list";
import {MakeBasicObject} from "./make-basic-object";

/**
 * The abstract operation OrdinaryObjectCreate takes argument proto (an Object or null) and optional
 * argument additionalInternalSlotsList (a List of names of internal slots). It is used to specify the
 * runtime creation of new ordinary objects. additionalInternalSlotsList contains the names of additional
 * internal slots that must be defined as part of the object, beyond [[Prototype]] and [[Extensible]].
 * If additionalInternalSlotsList is not provided, a new empty List is used.
 * https://tc39.es/ecma262/#sec-ordinaryobjectcreate
 */
export function OrdinaryObjectCreate<T>(proto: object | null, additionalInternalSlotsList?: List<string>): T {
	// Let internalSlotsList be « [[Prototype]], [[Extensible]] ».
	const internalSlotsList = makeList("[[Prototype]]", "[[Extensible]]");

	// If additionalInternalSlotsList is present, append each of its elements to internalSlotsList.
	if (additionalInternalSlotsList != null) {
		for (let i = 0; i < additionalInternalSlotsList.length; i++) {
			const additionalInternalSlot = additionalInternalSlotsList.get(i);
			if (additionalInternalSlot === "[[Prototype]]" || additionalInternalSlot === "[[Extensible]]") {
				continue;
			}
			internalSlotsList.append(additionalInternalSlot);
		}
	}

	// Let O be ! MakeBasicObject(internalSlotsList).
	const O = MakeBasicObject<T>(internalSlotsList);

	// Set O.[[Prototype]] to proto.
	internals(O)["[[Prototype]]"] = proto;

	// Return O.
	return O;
}
