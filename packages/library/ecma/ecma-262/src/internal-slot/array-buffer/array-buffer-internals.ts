import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";

export interface ArrayBufferInternalMethods extends ObjectInternalMethods {}

export interface ArrayBufferInternalProperties extends ObjectInternalProperties {
	"[[ArrayBufferData]]": DataView | null;
	"[[ArrayBufferByteLength]]": number;
	"[[ArrayBufferDetachKey]]": string;
}

export interface ArrayBufferInternals extends ArrayBufferInternalMethods, ArrayBufferInternalProperties {}

export const ARRAY_BUFFER_INTERNAL_METHODS: ArrayBufferInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const ARRAY_BUFFER_INTERNAL_PROPERTY_DEFAULTS = (obj: ArrayBuffer): Partial<ArrayBufferInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
