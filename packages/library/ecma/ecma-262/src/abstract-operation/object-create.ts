import {internals} from "../lib/internal-slot-map/internals";
import {List, makeList} from "../lib/list/list";
import {createObjectWithPrototype} from "../util/create-object-with-prototype";

/**
 * The abstract operation ObjectCreate with argument proto (an object or null) is used to specify the runtime creation of
 * new ordinary objects. The optional argument internalSlotsList is a List of the names of additional internal slots that
 * must be defined as part of the object. If the list is not provided, a new empty List is used.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-objectcreate
 */
export function ObjectCreate<T>(proto: object | null, internalSlotsList?: List<string>): T {
	const obj: T = createObjectWithPrototype(proto);

	// If internalSlotsList is not present, set internalSlotsList to a new empty List.
	if (internalSlotsList === undefined) {
		internalSlotsList = makeList();
	}

	// We can't use for...of or in any other way activate an iterator here since
	// ObjectCreate may be called during building intrinsics and The %ArrayIteratorPrototype%
	// intrinsic value haven't been prepared yet.
	for (let i = 0; i < internalSlotsList.length; i++) {
		(internals as unknown as (obj: unknown) => Record<string, undefined>)(obj)[internalSlotsList.get(i)] = undefined;
	}

	// Set obj.[[Prototype]] to proto.
	internals(obj)["[[Prototype]]"] = proto;

	// Set obj.[[Extensible]] to true.
	internals(obj)["[[Extensible]]"] = true;

	// Return obj.
	return obj;
}
