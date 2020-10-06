import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_SPLIT} from "../../../symbol/native/native";
import {regExpPrototypeSymbolSplit} from "../../../reg-exp/prototype/@@split";

export function patchRegExpPrototypeSymbolSplit(): void {
	// RegExp.prototype.@@split
	OrdinaryDefineOwnProperty(RegExp.prototype, Symbol.split, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolSplit()
	});

	if (NATIVE_SYMBOL_SPLIT !== undefined) {
		OrdinaryDefineOwnProperty(RegExp.prototype, NATIVE_SYMBOL_SPLIT, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": regExpPrototypeSymbolSplit()
		});
	}
}
