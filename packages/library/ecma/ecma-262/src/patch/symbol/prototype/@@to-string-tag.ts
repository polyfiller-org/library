import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../../../symbol/native/native";
import {symbolPrototypeSymbolToStringTag} from "../../../symbol/prototype/@@to-string-tag";

export function patchSymbolPrototypeSymbolToStringTag (): void {
// Symbol.prototype.@@toStringTag
	OrdinaryDefineOwnProperty(Symbol.prototype, Symbol.toStringTag, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": symbolPrototypeSymbolToStringTag
	});

	if (NATIVE_SYMBOL_TO_STRING_TAG !== undefined) {
		// Symbol.prototype.@@toStringTag
		OrdinaryDefineOwnProperty(Symbol.prototype, NATIVE_SYMBOL_TO_STRING_TAG, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": symbolPrototypeSymbolToStringTag
		});
	}
}