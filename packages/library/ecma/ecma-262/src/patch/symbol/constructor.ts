import {GlobalThisValue} from "../../environment/global-this-value";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {SymbolConstructor} from "../../symbol/symbol";
import {symbolPrototype} from "../../symbol/prototype/prototype";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {NATIVE_SYMBOL_HAS_INSTANCE} from "../../symbol/native/native";
import {symbolSymbolHasInstance} from "../../symbol/@@has-instance";

export function patchSymbolConstructor (): void {
	const globalThisValue = GlobalThisValue();

	// Symbol constructor
	OrdinaryDefineOwnProperty(globalThisValue, "Symbol", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": SymbolConstructor
	});

	// Symbol.prototype
	// https://tc39.es/ecma262/#sec-symbol.prototype
	OrdinaryDefineOwnProperty(SymbolConstructor, "prototype", {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": false,
		"[[Value]]": symbolPrototype
	});

	if (NATIVE_SYMBOL_HAS_INSTANCE !== undefined) {
		// Symbol.@@hasInstance
		OrdinaryDefineOwnProperty(Symbol, NATIVE_SYMBOL_HAS_INSTANCE, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": symbolSymbolHasInstance
		});
	}
}