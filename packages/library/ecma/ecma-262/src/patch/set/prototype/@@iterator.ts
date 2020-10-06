import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeSymbolIterator} from "../../../set/prototype/@@iterator";
import {NATIVE_SYMBOL_ITERATOR} from "../../../symbol/native/native";

export function patchSetPrototypeSymbolIterator(): void {
	// Set.prototype.@@iterator
	OrdinaryDefineOwnProperty(Set.prototype, Symbol.iterator, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeSymbolIterator
	});

	if (NATIVE_SYMBOL_ITERATOR !== undefined) {
		// Set.prototype.@@iterator
		OrdinaryDefineOwnProperty(Set.prototype, NATIVE_SYMBOL_ITERATOR, {
			...METHOD_DESCRIPTORS,
			"[[Value]]": setPrototypeSymbolIterator
		});
	}
}
