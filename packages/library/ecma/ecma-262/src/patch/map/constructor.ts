import {GlobalThisValue} from "../../environment/global-this-value";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {MapConstructor} from "../../map/map";
import {mapPrototype} from "../../map/prototype/prototype";

export function patchMapConstructor(): void {
	// Map constructor
	OrdinaryDefineOwnProperty(GlobalThisValue(), "Map", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": MapConstructor
	});

	// Map.prototype
	// https://tc39.es/ecma262/#sec-map.prototype
	OrdinaryDefineOwnProperty(Map, "prototype", {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true },
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": mapPrototype
	});

	OrdinaryDefineOwnProperty(Map, "prototype", {
		"[[Writable]]": false
	});
}
