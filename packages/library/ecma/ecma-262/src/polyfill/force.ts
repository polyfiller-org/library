import {arrayFrom} from "../array/from";
import {arrayOf} from "../array/of";
import {arrayIsArray} from "../array/is-array";
import {arraySymbolSpecies} from "../array/@@species";
import {arrayPrototypeConcat} from "../array/prototype/concat";
import {arrayPrototypeCopyWithin} from "../array/prototype/copy-within";
import {arrayPrototypeEntries} from "../array/prototype/entries";
import {arrayPrototypeSymbolIterator} from "../array/prototype/@@iterator";
import {arrayPrototypeValues} from "../array/prototype/values";
import {arrayPrototypeEvery} from "../array/prototype/every";
import {arrayPrototypeFill} from "../array/prototype/fill";
import {arrayPrototypeFilter} from "../array/prototype/filter";
import {arrayPrototypeFind} from "../array/prototype/find";
import {arrayPrototypeFindIndex} from "../array/prototype/find-index";
import {arrayPrototypeFlat} from "../array/prototype/flat";
import {arrayPrototypeFlatMap} from "../array/prototype/flat-map";
import {arrayPrototypeForEach} from "../array/prototype/for-each";
import {arrayPrototypeIncludes} from "../array/prototype/includes";
import {arrayPrototypeIndexOf} from "../array/prototype/index-of";
import {arrayPrototypeJoin} from "../array/prototype/join";
import {arrayPrototypeKeys} from "../array/prototype/keys";
import {arrayPrototypeLastIndexOf} from "../array/prototype/last-index-of";
import {arrayPrototypeMap} from "../array/prototype/map";
import {arrayPrototypePop} from "../array/prototype/pop";
import {arrayPrototypePush} from "../array/prototype/push";
import {arrayPrototypeReduce} from "../array/prototype/reduce";
import {arrayPrototypeReduceRight} from "../array/prototype/reduce-right";
import {arrayPrototypeReverse} from "../array/prototype/reverse";
import {arrayPrototypeShift} from "../array/prototype/shift";
import {arrayPrototypeSlice} from "../array/prototype/slice";
import {arrayPrototypeSome} from "../array/prototype/some";
import {arrayPrototypeSort} from "../array/prototype/sort";
import {arrayPrototypeSplice} from "../array/prototype/splice";
import {arrayPrototypeToLocaleString} from "../array/prototype/to-locale-string";
import {arrayPrototypeToString} from "../array/prototype/to-string";
import {arrayPrototypeUnshift} from "../array/prototype/unshift";
import {arrayPrototypeSymbolUnscopables} from "../array/prototype/@@unscopables";
import {ProxyConstructor} from "../proxy/proxy";
import {proxyRevocable} from "../proxy/revocable";
import {objectAssign} from "../object/assign";
import {objectCreate} from "../object/create";
import {objectDefineProperties} from "../object/define-properties";
import {objectEntries} from "../object/entries";
import {objectDefineProperty} from "../object/define-property";
import {objectFreeze} from "../object/freeze";
import {objectFromEntries} from "../object/from-entries";
import {objectGetOwnPropertyDescriptors} from "../object/get-own-property-descriptors";
import {objectGetOwnPropertyDescriptor} from "../object/get-own-property-descriptor";
import {objectSeal} from "../object/seal";
import {objectIsFrozen} from "../object/is-frozen";
import {objectIsSealed} from "../object/is-sealed";
import {objectGetOwnPropertyNames} from "../object/get-own-property-names";
import {objectGetOwnPropertySymbols} from "../object/get-own-property-symbols";
import {objectGetPrototypeOf} from "../object/get-prototype-of";
import {objectIs} from "../object/is";
import {objectIsExtensible} from "../object/is-extensible";
import {objectKeys} from "../object/keys";
import {objectPreventExtensions} from "../object/prevent-extensions";
import {objectSetPrototypeOf} from "../object/set-prototype-of";
import {objectValues} from "../object/values";
import {objectPrototypePropertyIsEnumerable} from "../object/prototype/property-is-enumerable";
import {objectPrototypeIsPrototypeOf} from "../object/prototype/is-prototype-of";
import {objectPrototypeToLocaleString} from "../object/prototype/to-locale-string";
import {functionPrototypeSymbolHasInstance} from "../function/prototype/@@has-instance";
import {SymbolConstructor} from "../symbol/symbol";
import {
	NATIVE_SYMBOL_ITERATOR,
	NATIVE_SYMBOL_MATCH,
	NATIVE_SYMBOL_MATCH_ALL,
	NATIVE_SYMBOL_REPLACE,
	NATIVE_SYMBOL_SEARCH,
	NATIVE_SYMBOL_SPECIES,
	NATIVE_SYMBOL_SPLIT,
	NATIVE_SYMBOL_TO_STRING_TAG
} from "../symbol/native/native";
import {MapConstructor} from "../map/map";
import {mapPrototype} from "../map/prototype/prototype";
import {mapSymbolSpecies} from "../map/@@species";
import {mapPrototypeClear} from "../map/prototype/clear";
import {mapPrototypeDelete} from "../map/prototype/delete";
import {mapPrototypeEntries} from "../map/prototype/entries";
import {mapPrototypeForEach} from "../map/prototype/for-each";
import {mapPrototypeGet} from "../map/prototype/get";
import {mapPrototypeHas} from "../map/prototype/has";
import {mapPrototypeKeys} from "../map/prototype/keys";
import {mapPrototypeSet} from "../map/prototype/set";
import {mapPrototypeSize} from "../map/prototype/size";
import {mapPrototypeValues} from "../map/prototype/values";
import {mapPrototypeSymbolIterator} from "../map/prototype/@@iterator";
import {mapPrototypeSymbolToStringTag} from "../map/prototype/@@to-string-tag";
import {promiseSymbolSpecies} from "../promise/@@species";
import {RegExpConstructor} from "../reg-exp/reg-exp";
import {regExpPrototype} from "../reg-exp/prototype/prototype";
import {regExpPrototypeExec} from "../reg-exp/prototype/exec";
import {regExpPrototypeTest} from "../reg-exp/prototype/test";
import {regExpPrototypeToString} from "../reg-exp/prototype/to-string";
import {regExpSymbolSpecies} from "../reg-exp/@@species";
import {regExpPrototypeSymbolMatch} from "../reg-exp/prototype/@@match";
import {regExpPrototypeSymbolMatchAll} from "../reg-exp/prototype/@@match-all";
import {regExpPrototypeSymbolReplace} from "../reg-exp/prototype/@@replace";
import {regExpPrototypeSymbolSearch} from "../reg-exp/prototype/@@search";
import {regExpPrototypeSymbolSplit} from "../reg-exp/prototype/@@split";
import {regExpPrototypeDotAll} from "../reg-exp/prototype/dot-all";
import {regExpPrototypeFlags} from "../reg-exp/prototype/flags";
import {regExpPrototypeGlobal} from "../reg-exp/prototype/global";
import {regExpPrototypeIgnoreCase} from "../reg-exp/prototype/ignore-case";
import {regExpPrototypeMultiline} from "../reg-exp/prototype/multiline";
import {regExpPrototypeSticky} from "../reg-exp/prototype/sticky";
import {regExpPrototypeUnicode} from "../reg-exp/prototype/unicode";
import {regExpPrototypeSource} from "../reg-exp/prototype/source";
import {stringPrototypeSymbolIterator} from "../string/prototype/@@iterator";
import {SetConstructor} from "../set/set";
import {setPrototype} from "../set/prototype/prototype";
import {setSymbolSpecies} from "../set/@@species";
import {setPrototypeAdd} from "../set/prototype/add";
import {setPrototypeClear} from "../set/prototype/clear";
import {setPrototypeDelete} from "../set/prototype/delete";
import {setPrototypeEntries} from "../set/prototype/entries";
import {setPrototypeForEach} from "../set/prototype/for-each";
import {setPrototypeHas} from "../set/prototype/has";
import {setPrototypeKeys} from "../set/prototype/keys";
import {setPrototypeSize} from "../set/prototype/size";
import {setPrototypeValues} from "../set/prototype/values";
import {setPrototypeSymbolIterator} from "../set/prototype/@@iterator";
import {setPrototypeSymbolToStringTag} from "../set/prototype/@@to-string-tag";
import {OrdinaryDefineOwnProperty} from "../abstract-operation/ordinary-define-own-property";
import {GlobalThisValue} from "../environment/global-this-value";
import {GETTER_DESCRIPTORS, METHOD_DESCRIPTORS} from "../patch/descriptors";
import {patch} from "../patch/index";

const globalThisValue = GlobalThisValue();

patch();

// Array.from
OrdinaryDefineOwnProperty(Array, "from", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayFrom
});

// Array.of
OrdinaryDefineOwnProperty(Array, "of", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayOf
});

// Array.isArray
OrdinaryDefineOwnProperty(Array, "isArray", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayIsArray
});

// Array.@@species
OrdinaryDefineOwnProperty(Array, ((SymbolConstructor as unknown) as {species: symbol}).species, {
	"[[Get]]": arraySymbolSpecies(),
	"[[Set]]": undefined
});

if (NATIVE_SYMBOL_SPECIES !== undefined) {
	// Map.prototype.@@iterator
	OrdinaryDefineOwnProperty(Array, NATIVE_SYMBOL_SPECIES, {
		"[[Get]]": arraySymbolSpecies(),
		"[[Set]]": undefined
	});
}

// Array.prototype.@@iterator
OrdinaryDefineOwnProperty(Array.prototype, ((SymbolConstructor as unknown) as {iterator: symbol}).iterator, {
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

// Array.prototype.concat
OrdinaryDefineOwnProperty(Array.prototype, "concat", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeConcat
});

// Array.prototype.copyWithin
OrdinaryDefineOwnProperty(Array.prototype, "copyWithin", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeCopyWithin
});

// Array.prototype.entries
OrdinaryDefineOwnProperty(Array.prototype, "entries", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeEntries
});

// Array.prototype.values
OrdinaryDefineOwnProperty(Array.prototype, "values", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeValues
});

// Array.prototype.every
OrdinaryDefineOwnProperty(Array.prototype, "every", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeEvery
});

// Array.prototype.fill
OrdinaryDefineOwnProperty(Array.prototype, "fill", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFill
});

// Array.prototype.filter
OrdinaryDefineOwnProperty(Array.prototype, "filter", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFilter
});

// Array.prototype.find
OrdinaryDefineOwnProperty(Array.prototype, "find", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFind
});

// Array.prototype.findIndex
OrdinaryDefineOwnProperty(Array.prototype, "findIndex", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFindIndex
});

// Array.prototype.flat
OrdinaryDefineOwnProperty(Array.prototype, "flat", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFlat
});

// Array.prototype.flatMap
OrdinaryDefineOwnProperty(Array.prototype, "flatMap", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeFlatMap
});

// Array.prototype.forEach
OrdinaryDefineOwnProperty(Array.prototype, "forEach", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeForEach
});

// Array.prototype.includes
OrdinaryDefineOwnProperty(Array.prototype, "includes", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeIncludes
});

// Array.prototype.indexOf
OrdinaryDefineOwnProperty(Array.prototype, "indexOf", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeIndexOf
});

// Array.prototype.join
OrdinaryDefineOwnProperty(Array.prototype, "join", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeJoin
});

// Array.prototype.keys
OrdinaryDefineOwnProperty(Array.prototype, "keys", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeKeys
});

// Array.prototype.lastIndexOf
OrdinaryDefineOwnProperty(Array.prototype, "lastIndexOf", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeLastIndexOf
});

// Array.prototype.map
OrdinaryDefineOwnProperty(Array.prototype, "map", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeMap
});

// Array.prototype.pop
OrdinaryDefineOwnProperty(Array.prototype, "pop", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypePop
});

// Array.prototype.push
OrdinaryDefineOwnProperty(Array.prototype, "push", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypePush
});

// Array.prototype.reduce
OrdinaryDefineOwnProperty(Array.prototype, "reduce", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeReduce
});

// Array.prototype.reduceRight
OrdinaryDefineOwnProperty(Array.prototype, "reduceRight", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeReduceRight
});

// Array.prototype.reverse
OrdinaryDefineOwnProperty(Array.prototype, "reverse", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeReverse
});

// Array.prototype.shift
OrdinaryDefineOwnProperty(Array.prototype, "shift", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeShift
});

// Array.prototype.slice
OrdinaryDefineOwnProperty(Array.prototype, "slice", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeSlice
});

// Array.prototype.slice
OrdinaryDefineOwnProperty(Array.prototype, "some", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeSome
});

// Array.prototype.sort
OrdinaryDefineOwnProperty(Array.prototype, "sort", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeSort
});

// Array.prototype.splice
OrdinaryDefineOwnProperty(Array.prototype, "splice", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeSplice
});

// Array.prototype.toLocaleString
OrdinaryDefineOwnProperty(Array.prototype, "toLocaleString", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeToLocaleString
});

// Array.prototype.toString
OrdinaryDefineOwnProperty(Array.prototype, "toString", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeToString
});

// Array.prototype.unshift
OrdinaryDefineOwnProperty(Array.prototype, "unshift", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": arrayPrototypeUnshift
});

// Array.prototype.@@unscopables
OrdinaryDefineOwnProperty(Array.prototype, ((SymbolConstructor as unknown) as {unscopables: symbol}).unscopables, {
	...METHOD_DESCRIPTORS,
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }
	"[[Writable]]": false,
	"[[Value]]": arrayPrototypeSymbolUnscopables
});

// Proxy constructor
OrdinaryDefineOwnProperty(globalThisValue, "Proxy", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": ProxyConstructor
});

// Proxy.revocable
OrdinaryDefineOwnProperty(ProxyConstructor, "revocable", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": proxyRevocable
});

// Object.assign
OrdinaryDefineOwnProperty(Object, "assign", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectAssign
});

// Object.create
OrdinaryDefineOwnProperty(Object, "create", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectCreate
});

// Object.defineProperties
OrdinaryDefineOwnProperty(Object, "defineProperties", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectDefineProperties
});

// Object.defineProperty
OrdinaryDefineOwnProperty(Object, "defineProperty", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectDefineProperty
});

// Object.entries
OrdinaryDefineOwnProperty(Object, "entries", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectEntries
});

// Object.freeze
OrdinaryDefineOwnProperty(Object, "freeze", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectFreeze
});

// Object.fromEntries
OrdinaryDefineOwnProperty(Object, "fromEntries", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectFromEntries
});

// Object.getOwnPropertyDescriptor
OrdinaryDefineOwnProperty(Object, "getOwnPropertyDescriptor", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectGetOwnPropertyDescriptor
});

// Object.getOwnPropertyDescriptors
OrdinaryDefineOwnProperty(Object, "getOwnPropertyDescriptors", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectGetOwnPropertyDescriptors
});

// Object.getOwnPropertyNames
OrdinaryDefineOwnProperty(Object, "getOwnPropertyNames", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectGetOwnPropertyNames
});

// Object.getOwnPropertySymbols
OrdinaryDefineOwnProperty(Object, "getOwnPropertySymbols", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectGetOwnPropertySymbols
});

// Object.getPrototypeOf
OrdinaryDefineOwnProperty(Object, "getPrototypeOf", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectGetPrototypeOf
});

// Object.is
OrdinaryDefineOwnProperty(Object, "is", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectIs
});

// Object.is
OrdinaryDefineOwnProperty(Object, "isExtensible", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectIsExtensible
});

// Object.isFrozen
OrdinaryDefineOwnProperty(Object, "isFrozen", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectIsFrozen
});

// Object.isFrozen
OrdinaryDefineOwnProperty(Object, "isSealed", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectIsSealed
});

// Object.isFrozen
OrdinaryDefineOwnProperty(Object, "keys", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectKeys
});

// Object.preventExtensions
OrdinaryDefineOwnProperty(Object, "preventExtensions", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectPreventExtensions
});

// Object.seal
OrdinaryDefineOwnProperty(Object, "seal", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectSeal
});

// Object.setPrototypeOf
OrdinaryDefineOwnProperty(Object, "setPrototypeOf", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectSetPrototypeOf
});

// Object.values
OrdinaryDefineOwnProperty(Object, "values", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectValues
});

// Object.prototype.propertyIsEnumerable
OrdinaryDefineOwnProperty(Object.prototype, "propertyIsEnumerable", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectPrototypePropertyIsEnumerable
});

// Object.prototype.isPrototypeOf
OrdinaryDefineOwnProperty(Object.prototype, "isPrototypeOf", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectPrototypeIsPrototypeOf
});

// Object.prototype.toLocaleString
OrdinaryDefineOwnProperty(Object.prototype, "toLocaleString", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": objectPrototypeToLocaleString
});

// Function.prototype.@@hasInstance
OrdinaryDefineOwnProperty(Function.prototype, ((SymbolConstructor as unknown) as {hasInstance: symbol}).hasInstance, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": false,
	"[[Value]]": functionPrototypeSymbolHasInstance()
});

// Map constructor
OrdinaryDefineOwnProperty(globalThisValue, "Map", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": MapConstructor
});

// Map.prototype
// https://tc39.es/ecma262/#sec-map.prototype
OrdinaryDefineOwnProperty(MapConstructor, "prototype", {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true },
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": mapPrototype
});
OrdinaryDefineOwnProperty(MapConstructor, "prototype", {
	"[[Writable]]": false
});

// Map.@@species
OrdinaryDefineOwnProperty(MapConstructor, ((SymbolConstructor as unknown) as {species: symbol}).species, {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": mapSymbolSpecies(),
	"[[Set]]": undefined
});

if (NATIVE_SYMBOL_SPECIES !== undefined) {
	// Map.@@species
	OrdinaryDefineOwnProperty(MapConstructor, NATIVE_SYMBOL_SPECIES, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": mapSymbolSpecies(),
		"[[Set]]": undefined
	});
}

// Map.prototype.clear
OrdinaryDefineOwnProperty(MapConstructor.prototype, "clear", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeClear
});

// Map.prototype.delete
OrdinaryDefineOwnProperty(MapConstructor.prototype, "delete", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeDelete
});

// Map.prototype.entries
OrdinaryDefineOwnProperty(MapConstructor.prototype, "entries", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeEntries
});

// Map.prototype.forEach
OrdinaryDefineOwnProperty(MapConstructor.prototype, "forEach", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeForEach
});

// Map.prototype.get
OrdinaryDefineOwnProperty(MapConstructor.prototype, "get", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeGet
});

// Map.prototype.has
OrdinaryDefineOwnProperty(MapConstructor.prototype, "has", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeHas
});

// Map.prototype.keys
OrdinaryDefineOwnProperty(MapConstructor.prototype, "keys", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeKeys
});

// Map.prototype.set
OrdinaryDefineOwnProperty(MapConstructor.prototype, "set", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeSet
});

// get Map.prototype.size
OrdinaryDefineOwnProperty(MapConstructor.prototype, "size", {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": mapPrototypeSize,
	"[[Set]]": undefined
});

// Map.prototype.values
OrdinaryDefineOwnProperty(MapConstructor.prototype, "values", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeValues
});

// Map.prototype.@@iterator
OrdinaryDefineOwnProperty(MapConstructor.prototype, ((SymbolConstructor as unknown) as {iterator: symbol}).iterator, {
	...METHOD_DESCRIPTORS,
	"[[Value]]": mapPrototypeSymbolIterator
});

if (NATIVE_SYMBOL_ITERATOR !== undefined) {
	// Map.prototype.@@iterator
	OrdinaryDefineOwnProperty(MapConstructor.prototype, NATIVE_SYMBOL_ITERATOR, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeSymbolIterator
	});
}

// Map.prototype.@@toStringTag
OrdinaryDefineOwnProperty(MapConstructor.prototype, ((SymbolConstructor as unknown) as {toStringTag: symbol}).toStringTag, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": mapPrototypeSymbolToStringTag
});

if (NATIVE_SYMBOL_TO_STRING_TAG !== undefined) {
	OrdinaryDefineOwnProperty(MapConstructor.prototype, NATIVE_SYMBOL_TO_STRING_TAG, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": mapPrototypeSymbolToStringTag
	});
}

// Promise.@@species
OrdinaryDefineOwnProperty(Promise, ((SymbolConstructor as unknown) as {species: symbol}).species, {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": promiseSymbolSpecies(),
	"[[Set]]": undefined
});

// RegExp constructor
OrdinaryDefineOwnProperty(globalThisValue, "RegExp", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": RegExpConstructor
});

// RegExp.@@species
OrdinaryDefineOwnProperty(RegExpConstructor, ((SymbolConstructor as unknown) as {species: symbol}).species, {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": regExpSymbolSpecies(),
	"[[Set]]": undefined
});

// RegExp.prototype
// https://tc39.es/ecma262/#sec-regexp.prototype
OrdinaryDefineOwnProperty(RegExpConstructor, "prototype", {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false },
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototype
});
OrdinaryDefineOwnProperty(RegExpConstructor, "prototype", {
	"[[Writable]]": false
});

// RegExp.prototype.@@match
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, ((SymbolConstructor as unknown) as {match: symbol}).match, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototypeSymbolMatch()
});

if (NATIVE_SYMBOL_MATCH !== undefined) {
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, NATIVE_SYMBOL_MATCH, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolMatch()
	});
}

// RegExp.prototype.@@matchAll
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, ((SymbolConstructor as unknown) as {matchAll: symbol}).matchAll, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototypeSymbolMatchAll()
});

if (NATIVE_SYMBOL_MATCH_ALL !== undefined) {
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, NATIVE_SYMBOL_MATCH_ALL, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolMatchAll()
	});
}

// RegExp.prototype.@@replace
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, ((SymbolConstructor as unknown) as {replace: symbol}).replace, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototypeSymbolReplace()
});

if (NATIVE_SYMBOL_REPLACE !== undefined) {
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, NATIVE_SYMBOL_REPLACE, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolReplace()
	});
}

// RegExp.prototype.@@search
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, ((SymbolConstructor as unknown) as {search: symbol}).search, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototypeSymbolSearch()
});

if (NATIVE_SYMBOL_SEARCH !== undefined) {
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, NATIVE_SYMBOL_SEARCH, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolSearch()
	});
}

// RegExp.prototype.@@split
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, ((SymbolConstructor as unknown) as {split: symbol}).split, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": regExpPrototypeSymbolSplit()
});

if (NATIVE_SYMBOL_SPLIT !== undefined) {
	OrdinaryDefineOwnProperty(RegExpConstructor.prototype, NATIVE_SYMBOL_SPLIT, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": regExpPrototypeSymbolSplit()
	});
}

// RegExp.prototype.dotAll
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "dotAll", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeDotAll
});

// RegExp.prototype.flags
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "flags", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeFlags
});

// RegExp.prototype.global
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "global", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeGlobal
});

// RegExp.prototype.ignoreCase
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "ignoreCase", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeIgnoreCase
});

// RegExp.prototype.multiline
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "multiline", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeMultiline
});

// RegExp.prototype.sticky
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "sticky", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeSticky
});

// RegExp.prototype.unicode
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "unicode", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeUnicode
});

// RegExp.prototype.source
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "source", {
	...GETTER_DESCRIPTORS,
	"[[Get]]": regExpPrototypeSource
});

// RegExp.prototype.exec
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "exec", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": regExpPrototypeExec
});

// RegExp.prototype.test
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "test", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": regExpPrototypeTest
});

// RegExp.prototype.toString
OrdinaryDefineOwnProperty(RegExpConstructor.prototype, "toString", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": regExpPrototypeToString
});

// Set constructor
OrdinaryDefineOwnProperty(globalThisValue, "Set", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": SetConstructor
});

// Set.prototype
// https://tc39.es/ecma262/#sec-map.prototype
OrdinaryDefineOwnProperty(SetConstructor, "prototype", {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true },
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": setPrototype
});
OrdinaryDefineOwnProperty(SetConstructor, "prototype", {
	"[[Writable]]": false
});

// Set.@@species
OrdinaryDefineOwnProperty(SetConstructor, ((SymbolConstructor as unknown) as {species: symbol}).species, {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": setSymbolSpecies(),
	"[[Set]]": undefined
});

if (NATIVE_SYMBOL_SPECIES !== undefined) {
	// Set.@@species
	OrdinaryDefineOwnProperty(SetConstructor, NATIVE_SYMBOL_SPECIES, {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": setSymbolSpecies(),
		"[[Set]]": undefined
	});
}

// Set.prototype.add
OrdinaryDefineOwnProperty(SetConstructor.prototype, "add", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeAdd
});

// Set.prototype.clear
OrdinaryDefineOwnProperty(SetConstructor.prototype, "clear", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeClear
});

// Set.prototype.delete
OrdinaryDefineOwnProperty(SetConstructor.prototype, "delete", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeDelete
});

// Set.prototype.entries
OrdinaryDefineOwnProperty(SetConstructor.prototype, "entries", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeEntries
});

// Set.prototype.forEach
OrdinaryDefineOwnProperty(SetConstructor.prototype, "forEach", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeForEach
});

// Set.prototype.has
OrdinaryDefineOwnProperty(SetConstructor.prototype, "has", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeHas
});

// Set.prototype.keys
OrdinaryDefineOwnProperty(SetConstructor.prototype, "keys", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeKeys
});

// get Set.prototype.size
OrdinaryDefineOwnProperty(SetConstructor.prototype, "size", {
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Get]]": setPrototypeSize,
	"[[Set]]": undefined
});

// Set.prototype.values
OrdinaryDefineOwnProperty(SetConstructor.prototype, "values", {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeValues
});

// Set.prototype.@@iterator
OrdinaryDefineOwnProperty(SetConstructor.prototype, ((SymbolConstructor as unknown) as {iterator: symbol}).iterator, {
	...METHOD_DESCRIPTORS,
	"[[Value]]": setPrototypeSymbolIterator
});

if (NATIVE_SYMBOL_ITERATOR !== undefined) {
	// Set.prototype.@@iterator
	OrdinaryDefineOwnProperty(SetConstructor.prototype, NATIVE_SYMBOL_ITERATOR, {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeSymbolIterator
	});
}

// Set.prototype.@@toStringTag
OrdinaryDefineOwnProperty(SetConstructor.prototype, ((SymbolConstructor as unknown) as {toStringTag: symbol}).toStringTag, {
	// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
	"[[Writable]]": false,
	"[[Enumerable]]": false,
	"[[Configurable]]": true,
	"[[Value]]": setPrototypeSymbolToStringTag
});

if (NATIVE_SYMBOL_TO_STRING_TAG !== undefined) {
	OrdinaryDefineOwnProperty(SetConstructor.prototype, NATIVE_SYMBOL_TO_STRING_TAG, {
		// This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.
		"[[Writable]]": false,
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Value]]": setPrototypeSymbolToStringTag
	});
}

// String.prototype.@@iterator
OrdinaryDefineOwnProperty(String.prototype, ((SymbolConstructor as unknown) as {iterator: symbol}).iterator, {
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
