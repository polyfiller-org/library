import {ObjectCreate} from "../abstract-operation/object-create";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {Realm} from "../environment/realm/realm";
import {NATIVE_SYMBOL_ITERATOR} from "../symbol/native/native";

export interface IteratorPrototype {
	[Symbol.iterator](): this;
}

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-%iteratorprototype%-object
 */
export function $IteratorPrototype$(realm: Realm): IteratorPrototype {
	const proto = ObjectCreate<IteratorPrototype>(realm["[[Intrinsics]]"]["[[%ObjectPrototype%]]"]);

	// http://www.ecma-international.org/ecma-262/10.0/index.html#sec-%iteratorprototype%-@@iterator
	OrdinaryDefineOwnProperty(proto, Symbol.iterator, {
		"[[Value]]": {
			[Symbol.iterator]() {
				return this;
			}
		}[Symbol.iterator],
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@iterator
	if (NATIVE_SYMBOL_ITERATOR != null && NATIVE_SYMBOL_ITERATOR !== Symbol.iterator) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_ITERATOR, {
			"[[Value]]": {
				[NATIVE_SYMBOL_ITERATOR]() {
					return this;
				}
			}[(NATIVE_SYMBOL_ITERATOR as unknown) as string],
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
