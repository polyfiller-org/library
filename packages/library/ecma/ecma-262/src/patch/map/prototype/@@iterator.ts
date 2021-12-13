import {METHOD_DESCRIPTORS} from "../../descriptors";
import {NATIVE_SYMBOL_ITERATOR} from "../../../symbol/native/native";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {mapPrototypeSymbolIterator} from "../../../map/prototype/@@iterator";

export function patchMapPrototypeSymbolIterator(): void {
	// Map.prototype.@@iterator
	OrdinaryDefineOwnProperty(Map.prototype, Symbol.iterator, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeSymbolIterator
	});

	if (NATIVE_SYMBOL_ITERATOR !== undefined) {
		// Map.prototype.@@iterator
		OrdinaryDefineOwnProperty(Map.prototype, NATIVE_SYMBOL_ITERATOR, {
			...METHOD_DESCRIPTORS,
			"[[Value]]": mapPrototypeSymbolIterator
		});
	}
}
