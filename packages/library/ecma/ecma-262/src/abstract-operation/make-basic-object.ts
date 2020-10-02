import {internals} from "../lib/internal-slot-map/internals";
import {List} from "../lib/list/list";
import {assert} from "./assert";
import {IsList} from "../lib/list/is-list";
import {createObjectWithPrototype} from "../util/create-object-with-prototype";

/**
 * The abstract operation MakeBasicObject takes argument internalSlotsList.
 * It is the source of all ECMAScript objects that are created algorithmically,
 * including both ordinary objects and exotic objects. It factors out common steps
 * used in creating all objects, and centralizes object creation.
 * https://tc39.es/ecma262/#sec-makebasicobject
 */
export function MakeBasicObject<T = object>(internalSlotsList: List<string>): T {
	// Assert: internalSlotsList is a List of internal slot names.
	assert(IsList(internalSlotsList), `Argument on position 0 must be a List of internal slot names`);

	// Let obj be a newly created object with an internal slot for each name in internalSlotsList.
	// Set obj's essential internal methods to the default ordinary object definitions specified in 9.1.
	// Assert: If the caller will not be overriding both obj's [[GetPrototypeOf]] and [[SetPrototypeOf]] essential internal methods, then internalSlotsList contains [[Prototype]].
	// Assert: If the caller will not be overriding all of obj's [[SetPrototypeOf]], [[IsExtensible]], and [[PreventExtensions]] essential internal methods, then internalSlotsList contains [[Extensible]].
	// If internalSlotsList contains [[Extensible]], then set obj.[[Extensible]] to true.
	const obj = createObjectWithPrototype(Object.prototype) as T;
	const internalSlots = internals(obj);
	for (let i = 0; i < internalSlotsList.length; i++) {
		const internalSlot = internalSlotsList.get(i);
		if (internalSlot === "[[Prototype]]") internalSlots[internalSlot] = null;
		else if (internalSlot === "[[Extensible]]") internalSlots[internalSlot] = true;
		else {
			(internalSlots as any)[internalSlot] = undefined;
		}
	}

	// Return obj.
	return obj;
}
