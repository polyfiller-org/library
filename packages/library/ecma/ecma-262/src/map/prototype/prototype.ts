import {MapConstructor} from "../map";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";

// https://tc39.es/ecma262/#sec-properties-of-the-map-prototype-object
// has a [[Prototype]] internal slot whose value is %Object.prototype%.
export const mapPrototype = {};

// https://tc39.es/ecma262/#sec-map.prototype.constructor
OrdinaryDefineOwnProperty(mapPrototype, "constructor", {
	"[[Enumerable]]": false,
	"[[Writable]]": true,
	"[[Configurable]]": true,
	"[[Value]]": MapConstructor
});
