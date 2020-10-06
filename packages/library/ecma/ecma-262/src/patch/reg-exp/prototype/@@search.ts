import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_SEARCH} from "../../../symbol/native/native";
import {regExpPrototypeSymbolSearch} from "../../../reg-exp/prototype/@@search";

export function patchRegExpPrototypeSymbolSearch(): void {
	// RegExp.prototype.@@search
	OrdinaryDefineOwnProperty(RegExp.prototype, Symbol.search, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolSearch()
	});

	if (NATIVE_SYMBOL_SEARCH !== undefined) {
		OrdinaryDefineOwnProperty(RegExp.prototype, NATIVE_SYMBOL_SEARCH, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": regExpPrototypeSymbolSearch()
		});
	}
}
