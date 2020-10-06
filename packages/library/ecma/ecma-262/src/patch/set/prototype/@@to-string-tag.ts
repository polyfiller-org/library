import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../../../symbol/native/native";
import {setPrototypeSymbolToStringTag} from "../../../set/prototype/@@to-string-tag";

export function patchSetPrototypeSymbolToStringTag(): void {
	// Set.prototype.@@toStringTag
	OrdinaryDefineOwnProperty(Set.prototype, Symbol.toStringTag, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": setPrototypeSymbolToStringTag
	});

	if (NATIVE_SYMBOL_TO_STRING_TAG !== undefined) {
		OrdinaryDefineOwnProperty(Set.prototype, NATIVE_SYMBOL_TO_STRING_TAG, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": setPrototypeSymbolToStringTag
		});
	}
}
