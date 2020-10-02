import {Realm} from "../environment/realm/realm";
import {ObjectCreate} from "../abstract-operation/object-create";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {IteratorPrototype} from "./iterator-prototype";
import {NATIVE_SYMBOL_ASYNC_ITERATOR} from "../symbol/native/native";

/**
 * https://tc39.es/ecma262/#sec-asynciteratorprototype
 */
export function $AsyncIteratorPrototype$(realm: Realm) {
	const proto = ObjectCreate(realm["[[Intrinsics]]"]["[[%ObjectPrototype%]]"]) as IteratorPrototype;

	// https://tc39.es/ecma262/#sec-asynciteratorprototype-asynciterator
	OrdinaryDefineOwnProperty(proto, Symbol.asyncIterator, {
		"[[Value]]": {
			[Symbol.asyncIterator]() {
				return this;
			}
		}[Symbol.asyncIterator],
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true
	});

	// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@asyncIterator
	if (NATIVE_SYMBOL_ASYNC_ITERATOR != null && NATIVE_SYMBOL_ASYNC_ITERATOR !== Symbol.asyncIterator) {
		OrdinaryDefineOwnProperty(proto, NATIVE_SYMBOL_ASYNC_ITERATOR, {
			"[[Value]]": {
				[NATIVE_SYMBOL_ASYNC_ITERATOR!]() {
					return this;
				}
			}[(NATIVE_SYMBOL_ASYNC_ITERATOR as unknown) as string],
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});
	}

	return proto;
}
