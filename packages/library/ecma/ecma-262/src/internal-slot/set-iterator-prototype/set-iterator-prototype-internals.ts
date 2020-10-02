import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {IteratorKind} from "../../type/iterator-kind";
import {SetIteratorPrototype} from "../../intrinsic/set-iterator-prototype";

export interface SetIteratorPrototypeInternalMethods extends ObjectInternalMethods {}

export interface SetIteratorPrototypeInternalProperties<Value> extends ObjectInternalProperties {
	"[[IteratedSet]]": Set<Value> | undefined;
	"[[IteratedSetMapIterator]]": IterableIterator<Value> | IterableIterator<[Value, Value]> | undefined;
	"[[SetNextIndex]]": number;
	"[[SetIterationKind]]": IteratorKind;
}

export interface SetIteratorPrototypeInternals<Value> extends SetIteratorPrototypeInternalMethods, SetIteratorPrototypeInternalProperties<Value> {}

export const SET_ITERATOR_PROTOTYPE_INTERNAL_METHODS: SetIteratorPrototypeInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const SET_ITERATOR_PROTOTYPE_INTERNAL_PROPERTY_DEFAULTS = <Value>(
	obj: SetIteratorPrototype<Value>
): Partial<SetIteratorPrototypeInternalProperties<Value>> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
