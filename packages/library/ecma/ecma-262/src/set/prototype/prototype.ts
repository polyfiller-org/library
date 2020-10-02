import {SetConstructor} from "../set";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";

// https://tc39.es/ecma262/#sec-properties-of-the-set-prototype-object
// has a [[Prototype]] internal slot whose value is %Object.prototype%.
export const setPrototype = {};

// https://tc39.es/ecma262/#sec-set.prototype.constructor
OrdinaryDefineOwnProperty(setPrototype, "constructor", {
	"[[Enumerable]]": false,
	"[[Writable]]": true,
	"[[Configurable]]": true,
	"[[Value]]": SetConstructor
});
