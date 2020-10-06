import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_MATCH_ALL} from "../../../symbol/native/native";
import {regExpPrototypeSymbolMatchAll} from "../../../reg-exp/prototype/@@match-all";

export function patchRegExpPrototypeSymbolMatchAll(): void {
	// RegExp.prototype.@@matchAll
	OrdinaryDefineOwnProperty(RegExp.prototype, Symbol.matchAll, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolMatchAll()
	});

	if (NATIVE_SYMBOL_MATCH_ALL !== undefined) {
		OrdinaryDefineOwnProperty(RegExp.prototype, NATIVE_SYMBOL_MATCH_ALL, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": regExpPrototypeSymbolMatchAll()
		});
	}
}
