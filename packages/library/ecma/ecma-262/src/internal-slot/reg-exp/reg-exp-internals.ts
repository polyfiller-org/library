import {Match} from "../../parser/regexp";
import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {failure} from "../../type/failure";

/**
 * https://tc39.es/ecma262/#sec-properties-of-regexp-instances
 */
export interface RegExpInternalMethods extends ObjectInternalMethods {}

export interface RegExpInternalProperties extends ObjectInternalProperties {
	"[[RegExpMatcher]]": (str: string, index: number) => Match | typeof failure;
	"[[OriginalSource]]": string;
	"[[OriginalFlags]]": string;
}

export interface RegExpInternals extends RegExpInternalMethods, RegExpInternalProperties {}

export const REG_EXP_INTERNAL_METHODS: RegExpInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const REG_EXP_INTERNAL_PROPERTY_DEFAULTS = (obj: RegExp): Partial<RegExpInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
