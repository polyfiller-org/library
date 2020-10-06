import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {functionPrototypeSymbolHasInstance} from "../../../function/prototype/@@has-instance";
import {NATIVE_SYMBOL_HAS_INSTANCE} from "../../../symbol/native/native";

export function patchFunctionPrototypeSymbolHasInstance(): void {
	// Function.prototype.@@hasInstance
	OrdinaryDefineOwnProperty(Function.prototype, Symbol.hasInstance, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": false,
		"[[Value]]": functionPrototypeSymbolHasInstance()
	});

	if (NATIVE_SYMBOL_HAS_INSTANCE !== undefined) {
		// Symbol.@@hasInstance
		OrdinaryDefineOwnProperty(Function.prototype, NATIVE_SYMBOL_HAS_INSTANCE, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": functionPrototypeSymbolHasInstance
		});
	}
}
