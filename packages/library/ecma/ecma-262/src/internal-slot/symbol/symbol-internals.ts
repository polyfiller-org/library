import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";

export interface SymbolInternalMethods extends ObjectInternalMethods {}

export interface SymbolInternalProperties extends ObjectInternalProperties {
	"[[Description]]": string | undefined;
}

export interface SymbolInternals extends SymbolInternalMethods, SymbolInternalProperties {}

export const SYMBOL_INTERNAL_METHODS: SymbolInternalMethods = {
	...OBJECT_INTERNAL_METHODS
};

export const SYMBOL_INTERNAL_PROPERTY_DEFAULTS = (obj: symbol): Partial<SymbolInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
