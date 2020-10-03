import {assert} from "./assert";
import {SameValue} from "./same-value";
import {IsInteger} from "./is-integer";
import {IsArray} from "./is-array";
import {ArrayCreate} from "./array-create";
import {Get} from "./get";
import {IsConstructor} from "./is-constructor";
import {Type} from "./type";
import {Constructor} from "../type/constructor";
import {Construct} from "./construct";
import {getCurrentRealmRecord} from "../environment/realm/get-current-realm-record";
import {GetFunctionRealm} from "./get-function-realm";
import {makeList} from "../lib/list/list";

/**
 * The abstract operation ArraySpeciesCreate with arguments originalArray and length is used to specify the
 * creation of a new Array object using a constructor function that is derived from originalArray.
 * https://tc39.es/ecma262/#sec-arrayspeciescreate
 */
export function ArraySpeciesCreate<T>(originalArray: T[], length: number): T[] {
	// Assert: length is an integer Number ≥ 0.
	assert(IsInteger(length) && length >= 0, `Argument on position 1 must be an Integer >= 0`);

	// If length is -0, set length to +0.
	if (SameValue(length, -0)) {
		length = +0;
	}

	// Let isArray be ? IsArray(originalArray).
	const isArray = IsArray(originalArray);

	// If isArray is false, return ? ArrayCreate(length).
	if (!isArray) {
		return ArrayCreate(length);
	}

	// Let C be ? Get(originalArray, "constructor").
	let C = (Get(originalArray, "constructor" as keyof typeof originalArray) as unknown) as Constructor | undefined | null;

	// If IsConstructor(C) is true, then
	if (IsConstructor(C)) {
		// Let thisRealm be the current Realm Record.
		const thisRealm = getCurrentRealmRecord();

		// Let realmC be ? GetFunctionRealm(C).
		const realmC = GetFunctionRealm(C);

		// If thisRealm and realmC are not the same Realm Record, then
		if (!SameValue(thisRealm, realmC)) {
			// If SameValue(C, realmC.[[Intrinsics]].[[%Array%]]) is true, set C to undefined.
			if (SameValue(C, realmC["[[Intrinsics]]"]["[[%Array%]]"])) {
				C = undefined;
			}
		}
	}

	// If Type(C) is Object, then
	if (Type(C) === "Object") {
		// Set C to ? Get(C, @@species).
		C = typeof Symbol !== "undefined" && "species" in Symbol ? Get(C, Symbol.species as keyof typeof C) : undefined;
		// If C is null, set C to undefined.
		if (C === null) {
			C = undefined;
		}
	}

	// If C is undefined, return ? ArrayCreate(length).
	if (C === undefined) {
		return ArrayCreate(length);
	}

	// If IsConstructor(C) is false, throw a TypeError exception.
	if (!IsConstructor(C)) {
		throw new TypeError();
	}

	// Return ? Construct(C, « length »).
	return Construct(C, makeList(length));
}
