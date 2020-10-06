import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_REPLACE} from "../../../symbol/native/native";
import {regExpPrototypeSymbolReplace} from "../../../reg-exp/prototype/@@replace";

export function patchRegExpPrototypeSymbolReplace(): void {
	// RegExp.prototype.@@replace
	OrdinaryDefineOwnProperty(RegExp.prototype, Symbol.replace, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolReplace()
	});

	if (NATIVE_SYMBOL_REPLACE !== undefined) {
		OrdinaryDefineOwnProperty(RegExp.prototype, NATIVE_SYMBOL_REPLACE, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": regExpPrototypeSymbolReplace()
		});
	}
}
