import {FUNCTION_INTERNAL_METHODS, FUNCTION_INTERNAL_PROPERTY_DEFAULTS, FunctionInternalProperties, FunctionInternals} from "../../internal-slot/function/function-internals";
import {OBJECT_INTERNAL_METHODS, OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalProperties, ObjectInternals} from "../../internal-slot/object/object-internals";
import {STRING_INTERNAL_METHODS, STRING_INTERNAL_PROPERTY_DEFAULTS, StringInternalProperties, StringInternals} from "../../internal-slot/string/string-internals";
import {ARRAY_INTERNAL_METHODS, ARRAY_INTERNAL_PROPERTY_DEFAULTS, ArrayInternalProperties, ArrayInternals} from "../../internal-slot/array/array-internals";
import {walkEntries} from "../../util/walk-entries";
import {IsArray} from "../../abstract-operation/is-array";
import {Type} from "../../abstract-operation/type";
import {PROXY_INTERNAL_METHODS, PROXY_INTERNAL_PROPERTY_DEFAULTS, ProxyInternalProperties, ProxyInternals} from "../../internal-slot/proxy/proxy-internals";
import {ARGUMENTS_INTERNAL_METHODS, ARGUMENTS_INTERNAL_PROPERTY_DEFAULTS, ArgumentsInternalProperties, ArgumentsInternals} from "../../internal-slot/arguments/arguments-internals";
import {IsArguments} from "../../abstract-operation/is-arguments";
import {MapLike} from "../map-like/map-like";
import {IsMap} from "../../abstract-operation/is-map";
import {MAP_INTERNAL_METHODS, MAP_INTERNAL_PROPERTY_DEFAULTS, MapInternalProperties, MapInternals} from "../../internal-slot/map/map-internals";
import {ArrayIteratorPrototype} from "../../intrinsic/array-iterator-prototype";
import {ArrayIteratorPrototypeInternals} from "../../internal-slot/array-iterator-prototype/array-iterator-prototype-internals";
import {TypedArrayInternals} from "../../internal-slot/typed-array/typed-array-internals";
import {TypedArray} from "../../type/typed-array";
import {MapIteratorPrototypeInternals} from "../../internal-slot/map-iterator-prototype/map-iterator-prototype-internals";
import {MapIteratorPrototype} from "../../intrinsic/map-iterator-prototype";
import {SYMBOL_INTERNAL_METHODS, SYMBOL_INTERNAL_PROPERTY_DEFAULTS, SymbolInternalProperties, SymbolInternals} from "../../internal-slot/symbol/symbol-internals";
import {
	SYMBOL_OBJECT_INTERNAL_METHODS,
	SYMBOL_OBJECT_INTERNAL_PROPERTY_DEFAULTS,
	SymbolObjectInternalProperties,
	SymbolObjectInternals
} from "../../internal-slot/symbol/symbol-object-internals";
import {StringIteratorPrototype} from "../../intrinsic/string-iterator-prototype";
import {StringIteratorPrototypeInternals} from "../../internal-slot/string-iterator-prototype/string-iterator-prototype-internals";
import {SetInternalProperties, SetInternals} from "../../internal-slot/set/set-internals";
import {SetIteratorPrototypeInternals} from "../../internal-slot/set-iterator-prototype/set-iterator-prototype-internals";
import {SetIteratorPrototype} from "../../intrinsic/set-iterator-prototype";
import {REG_EXP_INTERNAL_METHODS, REG_EXP_INTERNAL_PROPERTY_DEFAULTS, RegExpInternalProperties, RegExpInternals} from "../../internal-slot/reg-exp/reg-exp-internals";
import {IsRegExp} from "../../abstract-operation/is-regexp";
import {
	ARRAY_BUFFER_INTERNAL_METHODS,
	ARRAY_BUFFER_INTERNAL_PROPERTY_DEFAULTS,
	ArrayBufferInternalProperties,
	ArrayBufferInternals
} from "../../internal-slot/array-buffer/array-buffer-internals";
import {IsArrayBuffer} from "../../abstract-operation/is-array-buffer";
import {RegExpStringIteratorPrototype} from "../../intrinsic/reg-exp-string-iterator-prototype";
import {RegExpStringIteratorPrototypeInternals} from "../../internal-slot/reg-exp-string-iterator-prototype/reg-exp-string-iterator-prototype-internals";

const internalsMap = new MapLike<{}, {}>();

export type Internals<T> = T & ProxyInternals;

export function setInternals<T extends IArguments>(argument: T, kind: "arguments", propertyValues: Partial<ArgumentsInternalProperties>): Internals<ArgumentsInternals>;
export function setInternals<Value, T extends Set<Value>>(argument: T, kind: "set", propertyValues: Partial<SetInternalProperties<Value>>): Internals<SetInternals<Value>>;
export function setInternals<Key, Value, T extends Map<Key, Value>>(
	argument: T,
	kind: "map",
	propertyValues: Partial<MapInternalProperties<Key, Value>>
): Internals<MapInternals<Key, Value>>;
export function setInternals<T extends U[], U>(argument: T, kind: "array", propertyValues: Partial<ArrayInternalProperties>): Internals<ArrayInternals>;
export function setInternals<T extends RegExp>(argument: T, kind: "regexp", propertyValues: Partial<RegExpInternalProperties>): Internals<RegExpInternals>;
export function setInternals<T extends string>(argument: T, kind: "arraybuffer", propertyValues: Partial<ArrayBufferInternalProperties>): Internals<ArrayBufferInternals>;
export function setInternals<T extends string>(argument: T, kind: "string", propertyValues: Partial<StringInternalProperties>): Internals<StringInternals>;
export function setInternals<T extends symbol>(argument: T, kind: "symbol", propertyValues: Partial<SymbolInternalProperties>): Internals<SymbolInternals>;
export function setInternals<T extends symbol>(argument: T, kind: "symbol-object", propertyValues: Partial<SymbolObjectInternalProperties>): Internals<SymbolInternals>;
export function setInternals<T extends Function>(argument: T, kind: "function", propertyValues: Partial<FunctionInternalProperties>): Internals<FunctionInternals>;
export function setInternals<T extends object>(argument: T, kind: "proxy", propertyValues: Partial<ProxyInternalProperties>): Internals<ProxyInternals>;
export function setInternals<T extends Object>(argument: T, kind: "object", propertyValues: Partial<ObjectInternalProperties>): Internals<ObjectInternals>;
export function setInternals<T>(
	argument: T,
	kind: "proxy" | "arguments" | "set" | "map" | "array" | "regexp" | "arraybuffer" | "string" | "symbol" | "symbol-object" | "function" | "object",
	propertyValues: Partial<
		| ProxyInternalProperties
		| ArgumentsInternalProperties
		| SetInternalProperties<unknown>
		| MapInternalProperties<unknown, unknown>
		| ArrayInternalProperties
		| RegExpInternalProperties
		| ArrayBufferInternalProperties
		| StringInternalProperties
		| SymbolInternalProperties
		| SymbolObjectInternalProperties
		| FunctionInternalProperties
		| ObjectInternalProperties
	>
): Internals<
	| ProxyInternals
	| ArgumentsInternals
	| SetInternals<unknown>
	| MapInternals<unknown, unknown>
	| ArrayInternals
	| RegExpInternals
	| ArrayBufferInternals
	| StringInternals
	| SymbolInternals
	| SymbolObjectInternals
	| FunctionInternals
	| ObjectInternals
>;
export function setInternals<T>(
	argument: T,
	kind: "proxy" | "arguments" | "set" | "map" | "array" | "regexp" | "arraybuffer" | "string" | "symbol" | "symbol-object" | "function" | "object",
	propertyValues: Partial<
		| ProxyInternalProperties
		| ArgumentsInternalProperties
		| SetInternalProperties<unknown>
		| MapInternalProperties<unknown, unknown>
		| ArrayInternalProperties
		| RegExpInternalProperties
		| ArrayBufferInternalProperties
		| StringInternalProperties
		| SymbolInternalProperties
		| SymbolObjectInternalProperties
		| FunctionInternalProperties
		| ObjectInternalProperties
	>
): Internals<
	| ProxyInternals
	| ArgumentsInternals
	| SetInternals<unknown>
	| MapInternals<unknown, unknown>
	| ArrayInternals
	| RegExpInternals
	| ArrayBufferInternals
	| StringInternals
	| SymbolInternals
	| SymbolObjectInternals
	| FunctionInternals
	| ObjectInternals
> {
	const newInternals = {} as any;
	let methodInternals: any;
	let propertyInternals: any;

	switch (kind) {
		case "proxy": {
			methodInternals = PROXY_INTERNAL_METHODS;
			propertyInternals = PROXY_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "arguments": {
			methodInternals = ARGUMENTS_INTERNAL_METHODS;
			propertyInternals = ARGUMENTS_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "map": {
			methodInternals = MAP_INTERNAL_METHODS;
			propertyInternals = MAP_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "array": {
			methodInternals = ARRAY_INTERNAL_METHODS;
			propertyInternals = ARRAY_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "regexp": {
			methodInternals = REG_EXP_INTERNAL_METHODS;
			propertyInternals = REG_EXP_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "arraybuffer": {
			methodInternals = ARRAY_BUFFER_INTERNAL_METHODS;
			propertyInternals = ARRAY_BUFFER_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "string": {
			methodInternals = STRING_INTERNAL_METHODS;
			propertyInternals = STRING_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "symbol": {
			methodInternals = SYMBOL_INTERNAL_METHODS;
			propertyInternals = SYMBOL_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "symbol-object": {
			methodInternals = SYMBOL_OBJECT_INTERNAL_METHODS;
			propertyInternals = SYMBOL_OBJECT_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "function": {
			methodInternals = FUNCTION_INTERNAL_METHODS;
			propertyInternals = FUNCTION_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}

		case "object": {
			methodInternals = OBJECT_INTERNAL_METHODS;
			propertyInternals = OBJECT_INTERNAL_PROPERTY_DEFAULTS;
			break;
		}
	}

	walkEntries(methodInternals!, (key, value) => {
		newInternals[key] = value.bind(argument);
	});

	walkEntries(propertyInternals!(argument), (key, value) => {
		newInternals[key] = value;
	});

	walkEntries(propertyValues, (key, value) => {
		newInternals[key] = value;
	});

	internalsMap.set(argument, newInternals);
	return newInternals;
}

export function internals<Value>(argument: Set<Value>): Internals<ProxyInternals & SetInternals<Value>>;
export function internals<Key, Value>(argument: Map<Key, Value>): Internals<ProxyInternals & MapInternals<Key, Value>>;
export function internals<Key, Value>(argument: MapIteratorPrototype<Key, Value>): Internals<ProxyInternals & MapIteratorPrototypeInternals<Key, Value>>;
export function internals(argument: StringIteratorPrototype): Internals<ProxyInternals & StringIteratorPrototypeInternals>;
export function internals(argument: RegExpStringIteratorPrototype): Internals<ProxyInternals & RegExpStringIteratorPrototypeInternals>;
export function internals<T>(argument: SetIteratorPrototype<T>): Internals<ProxyInternals & SetIteratorPrototypeInternals<T>>;
export function internals<T>(argument: ArrayIteratorPrototype<T>): Internals<ProxyInternals & ArrayIteratorPrototypeInternals<T>>;
export function internals<T>(
	argument: IterableIterator<T>
): Internals<
	ProxyInternals &
		(
			| ArrayIteratorPrototypeInternals<unknown>
			| StringIteratorPrototypeInternals
			| RegExpStringIteratorPrototypeInternals
			| SetIteratorPrototypeInternals<unknown>
			| MapIteratorPrototypeInternals<unknown, unknown>
		)
>;
export function internals(argument: TypedArray): Internals<ProxyInternals & TypedArrayInternals>;
export function internals<T>(argument: TypedArray | T[]): Internals<ProxyInternals & (TypedArrayInternals | ArrayInternals)>;
export function internals<T extends symbol>(argument: T): Internals<SymbolInternals&SymbolObjectInternals>;
export function internals<T extends RegExp>(argument: T): Internals<RegExpInternals>;
export function internals(argument: ArrayBuffer): Internals<ArrayBufferInternals>;
export function internals<T extends string>(argument: T): Internals<StringInternals>;
export function internals(argument: string | RegExp): Internals<StringInternals | RegExpInternals>;
export function internals<T extends Function>(argument: T): Internals<ProxyInternals & FunctionInternals>;
export function internals<T extends IArguments>(argument: T): Internals<ProxyInternals & ArgumentsInternals>;
export function internals<T extends U[], U>(argument: T): Internals<ProxyInternals & ArrayInternals>;
export function internals<T extends Object>(argument: T): Internals<ProxyInternals & ObjectInternals>;
export function internals<T>(
	argument: T
): Internals<
	| ProxyInternals
	| ArrayInternals
	| RegExpInternals
	| ArrayBufferInternals
	| StringInternals
	| SymbolInternals
	| FunctionInternals
	| ObjectInternals
	| SetInternals<unknown>
	| MapInternals<unknown, unknown>
> {
	if (internalsMap.has(argument)) {
		return internalsMap.get(argument) as Internals<
			| ProxyInternals
			| RegExpInternals
			| ArrayBufferInternals
			| StringInternals
			| SymbolInternals
			| FunctionInternals
			| ArrayInternals
			| ObjectInternals
			| SetInternals<unknown>
			| MapInternals<unknown, unknown>
		>;
	}

	const kind = (() => {
		if (IsArray(argument, true)) {
			return "array" as const;
		} else if (IsArguments(argument)) {
			return "arguments" as const;
		} else if (typeof argument === "string") {
			return "string" as const;
		} else if (Type(argument) === "Symbol") {
			return "symbol" as const;
		} else if (IsMap(argument)) {
			return "map" as const;
		} else if (IsRegExp(argument, true)) {
			return "regexp" as const;
		} else if (IsArrayBuffer(argument)) {
			return "arraybuffer" as const;
		} else if (typeof argument === "function") {
			return "function" as const;
		} else {
			return "object" as const;
		}
	})();
	return setInternals(argument, kind, {});
}
