import {SymbolConstructor} from "../symbol";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";

// https://tc39.es/ecma262/#sec-properties-of-the-symbol-prototype-object
// has a [[Prototype]] internal slot whose value is %Object.prototype%.
export const symbolPrototype = {};

// https://tc39.es/ecma262/#sec-symbol.prototype.constructor
OrdinaryDefineOwnProperty(symbolPrototype, "constructor", {
	"[[Enumerable]]": false,
	"[[Writable]]": true,
	"[[Configurable]]": true,
	"[[Value]]": SymbolConstructor
});
