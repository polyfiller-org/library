import {assertType} from "./assert";
import {Constructor} from "../type/constructor";
import {IsConstructor} from "./is-constructor";
import {Type} from "./type";
import {Get} from "./get";

/**
 * The abstract operation SpeciesConstructor takes arguments O (an Object) and defaultConstructor (a constructor).
 * It is used to retrieve the constructor that should be used to create new objects that are derived from O.
 * defaultConstructor is the constructor to use if a constructor @@species property cannot be found starting from O.
 * It performs the following steps when called:
 * https://tc39.es/ecma262/#sec-speciesconstructor
 */
export function SpeciesConstructor<TO, Ctor extends Constructor>(O: TO, defaultConstructor: Ctor): Ctor | Constructor<unknown> {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Let C be ? Get(O, "constructor").
	const C = Get(O, "constructor");

	// If C is undefined, return defaultConstructor.
	if (C === undefined) {
		return defaultConstructor;
	}

	// If Type(C) is not Object, throw a TypeError exception.
	if (Type(C) !== "Object") {
		throw new TypeError();
	}

	// Let S be ? Get(C, @@species).
	const S = typeof Symbol !== "undefined" && "species" in Symbol ? Get(C, Symbol.species) : undefined;

	// If S is either undefined or null, return defaultConstructor.
	if (S === null || S === undefined) {
		return defaultConstructor;
	}

	// If IsConstructor(S) is true, return S.
	if (IsConstructor(S)) {
		return S;
	}

	// Throw a TypeError exception.
	throw new TypeError();
}
