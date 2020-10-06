import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {NATIVE_SYMBOL_ITERATOR} from "../../../symbol/native/native";
import {stringPrototypeSymbolIterator} from "../../../string/prototype/@@iterator";

export function patchStringPrototypeSymbolIterator(): void {
	// String.prototype.@@iterator
	OrdinaryDefineOwnProperty(String.prototype, Symbol.iterator, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": stringPrototypeSymbolIterator()
	});

	if (NATIVE_SYMBOL_ITERATOR !== undefined) {
		// String.prototype.@@iterator
		OrdinaryDefineOwnProperty(String.prototype, NATIVE_SYMBOL_ITERATOR, {
			...METHOD_DESCRIPTORS,
			"[[Value]]": stringPrototypeSymbolIterator()
		});
	}
}
