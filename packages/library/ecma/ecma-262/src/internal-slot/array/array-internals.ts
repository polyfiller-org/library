import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {__ArrayDefineOwnProperty__} from "./define-own-property";

/**
 * https://tc39.es/ecma262/#sec-bound-function-exotic-objects
 */
export interface ArrayInternalMethods extends ObjectInternalMethods {}

export interface ArrayInternalProperties extends ObjectInternalProperties {}

export interface ArrayInternals extends ArrayInternalMethods, ArrayInternalProperties {}

export const ARRAY_INTERNAL_METHODS: ArrayInternalMethods = {
	...OBJECT_INTERNAL_METHODS,
	"[[DefineOwnProperty]]": __ArrayDefineOwnProperty__
};

export const ARRAY_INTERNAL_PROPERTY_DEFAULTS = (obj: unknown[]): Partial<ArrayInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
