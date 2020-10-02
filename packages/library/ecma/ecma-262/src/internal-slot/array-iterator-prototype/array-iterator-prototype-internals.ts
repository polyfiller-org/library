import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {ArrayIteratorPrototype} from "../../intrinsic/array-iterator-prototype";
import {TypedArray} from "../../type/typed-array";
import {IteratorKind} from "../../type/iterator-kind";

export interface ArrayIteratorPrototypeInternalMethods extends ObjectInternalMethods {}

export interface ArrayIteratorPrototypeInternalProperties<T> extends ObjectInternalProperties {
	"[[IteratedObject]]": T[] | TypedArray | undefined;
	"[[ArrayIteratorNextIndex]]": number;
	"[[ArrayIterationKind]]": IteratorKind;
}

export interface ArrayIteratorPrototypeInternals<T> extends ArrayIteratorPrototypeInternalMethods, ArrayIteratorPrototypeInternalProperties<T> {}

export const ARRAY_ITERATOR_PROTOTYPE_INTERNAL_METHODS: ArrayIteratorPrototypeInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const ARRAY_ITERATOR_PROTOTYPE_INTERNAL_PROPERTY_DEFAULTS = <T>(
	obj: ArrayIteratorPrototype
): Partial<ArrayIteratorPrototypeInternalProperties<T>> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
