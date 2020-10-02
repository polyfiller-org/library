import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {RegExpStringIteratorPrototype} from "../../intrinsic/reg-exp-string-iterator-prototype";

export interface RegExpStringIteratorPrototypeInternalMethods extends ObjectInternalMethods {}

export interface RegExpStringIteratorPrototypeInternalProperties extends ObjectInternalProperties {
	"[[IteratingRegExp]]": RegExp | undefined;
	"[[IteratedString]]": string | undefined;
	"[[Global]]": boolean;
	"[[Unicode]]": boolean;
	"[[Done]]": boolean;
}

export interface RegExpStringIteratorPrototypeInternals
	extends RegExpStringIteratorPrototypeInternalMethods,
		RegExpStringIteratorPrototypeInternalProperties {}

export const REG_EXP_STRING_ITERATOR_PROTOTYPE_INTERNAL_METHODS: RegExpStringIteratorPrototypeInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const REG_EXP_STRING_ITERATOR_PROTOTYPE_INTERNAL_PROPERTY_DEFAULTS = (
	obj: RegExpStringIteratorPrototype
): Partial<RegExpStringIteratorPrototypeInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj),
	"[[Done]]": false,
	"[[Global]]": false,
	"[[Unicode]]": false
});
