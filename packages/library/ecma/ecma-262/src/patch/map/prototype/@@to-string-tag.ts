import {NATIVE_SYMBOL_TO_STRING_TAG} from "../../../symbol/native/native";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {mapPrototypeSymbolToStringTag} from "../../../map/prototype/@@to-string-tag";

export function patchMapPrototypeSymbolToStringTag(): void {
	// Map.prototype.@@toStringTag
	OrdinaryDefineOwnProperty(Map.prototype, Symbol.toStringTag, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": mapPrototypeSymbolToStringTag
	});

	if (NATIVE_SYMBOL_TO_STRING_TAG !== undefined) {
		OrdinaryDefineOwnProperty(Map.prototype, NATIVE_SYMBOL_TO_STRING_TAG, {
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true,
			"[[Value]]": mapPrototypeSymbolToStringTag
		});
	}
}
