import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {List} from "../../lib/list/list";

export interface MapDataEntry<Key, Value> {
	"[[Key]]": Key;
	"[[Value]]": Value;
	"[[KeyIndex]]": number;
}

export interface MapKeyEntry<Key> {
	"[[Key]]": Key;
}

/**
 * https://tc39.es/ecma262/#sec-map-constructor
 */
export interface MapInternalMethods extends ObjectInternalMethods {}

export interface MapInternalProperties<Key, Value> extends ObjectInternalProperties {
	"[[MapData]]": List<List<MapDataEntry<Key, Value>>>;
	"[[MapKeys]]": List<MapKeyEntry<Key>>;
	"[[MapLoadFactor]]": number;
	"[[MapSize]]": number;
	"[[MapCollisions]]": number;
}

export interface MapInternals<Key, Value> extends MapInternalMethods, MapInternalProperties<Key, Value> {}

export const MAP_INTERNAL_METHODS: MapInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const MAP_INTERNAL_PROPERTY_DEFAULTS = <Key, Value>(obj: Map<Key, Value>): Partial<MapInternalProperties<Key, Value>> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
