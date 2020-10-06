import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {SetConstructor} from "../../set/set";
import {setPrototype} from "../../set/prototype/prototype";
import {GlobalThisValue} from "../../environment/global-this-value";

export function patchSetConstructor(): void {
	// Set constructor
	OrdinaryDefineOwnProperty(GlobalThisValue(), "Set", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": SetConstructor
	});

	// Set.prototype
	// https://tc39.es/ecma262/#sec-map.prototype
	OrdinaryDefineOwnProperty(Set, "prototype", {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true },
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": setPrototype
	});
	OrdinaryDefineOwnProperty(Set, "prototype", {
		"[[Writable]]": false
	});
}
