import {RegExpConstructor} from "../reg-exp";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";

// https://tc39.es/ecma262/#sec-properties-of-the-regexp-prototype-object
// has a [[Prototype]] internal slot whose value is %Object.prototype%.
export const regExpPrototype = {};

// https://tc39.es/ecma262/#sec-regexp.prototype.constructor
OrdinaryDefineOwnProperty(regExpPrototype, "constructor", {
	"[[Enumerable]]": false,
	"[[Writable]]": true,
	"[[Configurable]]": true,
	"[[Value]]": RegExpConstructor
});
