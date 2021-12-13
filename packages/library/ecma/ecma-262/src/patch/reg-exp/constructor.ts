import {GlobalThisValue} from "../../environment/global-this-value";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {RegExpConstructor} from "../../reg-exp/reg-exp";
import {regExpPrototype} from "../../reg-exp/prototype/prototype";

export function patchRegExpConstructor(): void {
	// RegExp constructor
	OrdinaryDefineOwnProperty(GlobalThisValue(), "RegExp", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": RegExpConstructor
	});

	// RegExp.prototype
	// https://tc39.es/ecma262/#sec-regexp.prototype
	OrdinaryDefineOwnProperty(RegExp, "prototype", {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false },
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototype
	});
	OrdinaryDefineOwnProperty(RegExp, "prototype", {
		"[[Writable]]": false
	});
}
