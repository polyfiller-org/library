import {METHOD_DESCRIPTORS} from "../../descriptors";
import {NATIVE_SYMBOL_UNSCOPABLES} from "../../../symbol/native/native";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeSymbolUnscopables} from "../../../array/prototype/@@unscopables";

export function patchArrayPrototypeSymbolUnscopables(): void {
	// Array.prototype.@@unscopables
	OrdinaryDefineOwnProperty(Array.prototype, Symbol.unscopables, {
		...METHOD_DESCRIPTORS,
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }
		"[[Writable]]": false,
		"[[Value]]": arrayPrototypeSymbolUnscopables
	});

	if (NATIVE_SYMBOL_UNSCOPABLES !== undefined) {
		// Array.prototype.@@unscopables
		OrdinaryDefineOwnProperty(Array.prototype, NATIVE_SYMBOL_UNSCOPABLES, {
			...METHOD_DESCRIPTORS,
			// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }
			"[[Writable]]": false,
			"[[Value]]": arrayPrototypeSymbolUnscopables
		});
	}
}
