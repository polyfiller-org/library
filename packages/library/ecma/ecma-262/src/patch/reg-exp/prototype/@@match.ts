import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_MATCH} from "../../../symbol/native/native";
import {regExpPrototypeSymbolMatch} from "../../../reg-exp/prototype/@@match";

export function patchRegExpPrototypeSymbolMatch(): void {
	// RegExp.prototype.@@match
	OrdinaryDefineOwnProperty(RegExp.prototype, Symbol.match, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolMatch()
	});

	if (NATIVE_SYMBOL_MATCH !== undefined) {
		OrdinaryDefineOwnProperty(RegExp.prototype, NATIVE_SYMBOL_MATCH, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": regExpPrototypeSymbolMatch()
		});
	}
}
