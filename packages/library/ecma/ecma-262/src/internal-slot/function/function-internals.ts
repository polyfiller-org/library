import {Realm} from "../../environment/realm/realm";
import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {Constructor} from "../../type/constructor";
import {__Construct__} from "./construct";
import {__Call__} from "./call";
import {List} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-bound-function-exotic-objects
 */
export interface FunctionInternalMethods extends ObjectInternalMethods {
	new (...args: any[]): any;
	(...args: any[]): any;
	"[[Call]]"(thisArgument: any, argumentsList: List): ReturnType<this>;
	"[[Construct]]"(argumentsList: List, newTarget: Constructor): InstanceType<this>;
}

export interface FunctionInternalProperties extends ObjectInternalProperties {
	"[[Environment]]": undefined;
	"[[FormalParameters]]": undefined;
	"[[FunctionKind]]": "normal" | "classConstructor" | "generator" | "async" | "async generator" | undefined;
	"[[ECMAScriptCode]]": undefined;
	"[[ConstructorKind]": "base" | "derived" | undefined;
	"[[ScriptOrModule]]": null | undefined;
	"[[Realm]]": Realm | undefined;
	"[[ThisMode]]": "lexical" | "strict" | "global" | undefined;
	"[[Strict]]": boolean | undefined;
	"[[HomeObject]]": {} | undefined;
	"[[SourceText]]": string | undefined;
}

export interface FunctionInternals extends FunctionInternalMethods, FunctionInternalProperties {}

export const FUNCTION_INTERNAL_METHODS = {
	...OBJECT_INTERNAL_METHODS,
	"[[Call]]": __Call__,
	"[[Construct]]": __Construct__
} as FunctionInternalMethods;

export const FUNCTION_INTERNAL_PROPERTY_DEFAULTS = (obj: Function): Partial<FunctionInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj),
	"[[FunctionKind]]": "normal",
	"[[ConstructorKind]": "base"
});
