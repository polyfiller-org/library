import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {__StringDefineOwnProperty__} from "./define-own-property";
import {__StringGetOwnProperty__} from "./get-own-property";
import {__StringOwnPropertyKeys__} from "./own-property-keys";
import {List} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-string-exotic-objects
 */
export interface StringInternalMethods extends ObjectInternalMethods {
	"[[OwnPropertyKeys]]"(): List<PropertyKey>;
}

export interface StringInternalProperties extends ObjectInternalProperties {
	"[[StringData]]": string;
}

export interface StringInternals extends StringInternalMethods, StringInternalProperties {}

export const STRING_INTERNAL_METHODS: StringInternalMethods = {
	...OBJECT_INTERNAL_METHODS,
	"[[DefineOwnProperty]]": __StringDefineOwnProperty__,
	"[[GetOwnProperty]]": __StringGetOwnProperty__,
	"[[OwnPropertyKeys]]": __StringOwnPropertyKeys__
};

export const STRING_INTERNAL_PROPERTY_DEFAULTS = (obj: string): Partial<StringInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj),
	"[[StringData]]": obj
});
