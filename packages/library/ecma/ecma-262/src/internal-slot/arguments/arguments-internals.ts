import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {__ArgumentsGetOwnProperty__} from "./get-own-property";
import {__ArgumentsDefineOwnProperty__} from "./define-own-property";
import {__ArgumentsGet__} from "./get";
import {__ArgumentsSet__} from "./set";
import {__ArgumentsDelete__} from "./delete";
import {createObjectWithPrototype} from "../../util/create-object-with-prototype";

/**
 * https://tc39.es/ecma262/#sec-arguments-exotic-objects
 */
export interface ArgumentsInternalMethods extends ObjectInternalMethods {}

export interface ArgumentsInternalProperties extends ObjectInternalProperties {
	"[[ParameterMap]]": Record<string, unknown>;
}

export interface ArgumentsInternals extends ArgumentsInternalMethods, ArgumentsInternalProperties {}

export const ARGUMENTS_INTERNAL_METHODS: ArgumentsInternalMethods = {
	...OBJECT_INTERNAL_METHODS,
	"[[GetOwnProperty]]": __ArgumentsGetOwnProperty__,
	"[[DefineOwnProperty]]": __ArgumentsDefineOwnProperty__,
	"[[Get]]": __ArgumentsGet__,
	"[[Set]]": __ArgumentsSet__,
	"[[Delete]]": __ArgumentsDelete__
};

export const ARGUMENTS_INTERNAL_PROPERTY_DEFAULTS = (obj: IArguments): Partial<ArgumentsInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj),
	"[[ParameterMap]]": createObjectWithPrototype(null) as Record<string, unknown>
});
