import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {IteratorKind} from "../../type/iterator-kind";
import {MapIteratorPrototype} from "../../intrinsic/map-iterator-prototype";

export interface MapIteratorPrototypeInternalMethods extends ObjectInternalMethods {}

export interface MapIteratorPrototypeInternalProperties<Key, Value> extends ObjectInternalProperties {
	"[[Map]]": Map<Key, Value> | undefined;
	"[[MapNextIndex]]": number;
	"[[MapIterationKind]]": IteratorKind;
}

export interface MapIteratorPrototypeInternals<Key, Value>
	extends MapIteratorPrototypeInternalMethods,
		MapIteratorPrototypeInternalProperties<Key, Value> {}

export const MAP_ITERATOR_PROTOTYPE_INTERNAL_METHODS: MapIteratorPrototypeInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const MAP_ITERATOR_PROTOTYPE_INTERNAL_PROPERTY_DEFAULTS = <Key, Value>(
	obj: MapIteratorPrototype
): Partial<MapIteratorPrototypeInternalProperties<Key, Value>> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
