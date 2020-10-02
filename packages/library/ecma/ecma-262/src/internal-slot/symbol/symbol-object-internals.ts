import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";

export interface SymbolObjectInternalMethods extends ObjectInternalMethods {}

export interface SymbolObjectInternalProperties extends ObjectInternalProperties {
	"[[SymbolData]]": symbol;
}

export interface SymbolObjectInternals extends SymbolObjectInternalMethods, SymbolObjectInternalProperties {}

export const SYMBOL_OBJECT_INTERNAL_METHODS: SymbolObjectInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const SYMBOL_OBJECT_INTERNAL_PROPERTY_DEFAULTS = (obj: symbol): Partial<SymbolObjectInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
