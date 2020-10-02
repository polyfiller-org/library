import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {symbolPrototypeSymbolToPrimitive} from "../../../symbol/prototype/@@to-primitive";
import {NATIVE_SYMBOL_TO_PRIMITIVE} from "../../../symbol/native/native";

export function patchSymbolPrototypeSymbolToPrimitive (): void {

	// Symbol.prototype.@@toPrimitive
	OrdinaryDefineOwnProperty(Symbol.prototype, Symbol.toPrimitive, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": symbolPrototypeSymbolToPrimitive()
	});

	if (NATIVE_SYMBOL_TO_PRIMITIVE !== undefined) {
		// Symbol.prototype.@@toPrimitive
		OrdinaryDefineOwnProperty(Symbol.prototype, NATIVE_SYMBOL_TO_PRIMITIVE, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": symbolPrototypeSymbolToPrimitive()
		});
	}
}