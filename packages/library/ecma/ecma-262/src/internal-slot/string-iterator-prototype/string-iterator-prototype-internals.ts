import {
	OBJECT_INTERNAL_METHODS,
	OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	ObjectInternalMethods,
	ObjectInternalProperties
} from "../object/object-internals";
import {StringIteratorPrototype} from "../../intrinsic/string-iterator-prototype";

export interface StringIteratorPrototypeInternalMethods extends ObjectInternalMethods {}

export interface StringIteratorPrototypeInternalProperties extends ObjectInternalProperties {
	"[[IteratedString]]": string | undefined;
	"[[StringIteratorNextIndex]]": number;
}

export interface StringIteratorPrototypeInternals extends StringIteratorPrototypeInternalMethods, StringIteratorPrototypeInternalProperties {}

export const STRING_ITERATOR_PROTOTYPE_INTERNAL_METHODS: StringIteratorPrototypeInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const STRING_ITERATOR_PROTOTYPE_INTERNAL_PROPERTY_DEFAULTS = (
	obj: StringIteratorPrototype
): Partial<StringIteratorPrototypeInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
