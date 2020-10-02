import {METHOD_DESCRIPTORS} from "../../descriptors";
import {arrayPrototypeSymbolIterator} from "../../../array/prototype/@@iterator";
import {NATIVE_SYMBOL_ITERATOR} from "../../../symbol/native/native";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";

export function patchArrayPrototypeSymbolIterator(): void {
// Array.prototype.@@iterator
	OrdinaryDefineOwnProperty(Array.prototype, Symbol.iterator, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeSymbolIterator
	});

	if (NATIVE_SYMBOL_ITERATOR !== undefined) {
		// Array.prototype.@@iterator
		OrdinaryDefineOwnProperty(Array.prototype, NATIVE_SYMBOL_ITERATOR, {
			...METHOD_DESCRIPTORS,
			"[[Value]]": arrayPrototypeSymbolIterator
		});
	}
}
