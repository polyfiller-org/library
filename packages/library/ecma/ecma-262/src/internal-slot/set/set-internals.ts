import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";

export interface SetInternalMethods extends ObjectInternalMethods {}

export interface SetInternalProperties<Value> extends ObjectInternalProperties {
	"[[SetData]]": Map<Value, Value>;
}

export interface SetInternals<Value> extends SetInternalMethods, SetInternalProperties<Value> {}

export const SET_INTERNAL_METHODS: SetInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const SET_INTERNAL_PROPERTY_DEFAULTS = <Value>(obj: Set<Value>): Partial<SetInternalProperties<Value>> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
