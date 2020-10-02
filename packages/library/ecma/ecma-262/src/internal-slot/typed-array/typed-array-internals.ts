import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {TypedArray} from "../../type/typed-array";
import {ProxyInternals} from "../proxy/proxy-internals";

export interface TypedArrayInternalMethods extends ObjectInternalMethods {}

export interface TypedArrayInternalProperties extends ObjectInternalProperties {
	"[[TypedArrayName]]": string;
	"[[ViewedArrayBuffer]]": ArrayBuffer;
	"[[ArrayLength]]": number;
}

export interface TypedArrayInternals extends TypedArrayInternalMethods, TypedArrayInternalProperties {}

export const TYPED_ARRAY_INTERNAL_METHODS: TypedArrayInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const TYPED_ARRAY_INTERNAL_PROPERTY_DEFAULTS = (obj: TypedArray): Partial<TypedArrayInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});

export function isTypedArrayInternals(internals: ProxyInternals | TypedArrayInternals): internals is TypedArrayInternals {
	return "[[TypedArrayName]]" in internals;
}
