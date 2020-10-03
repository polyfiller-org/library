import {assert, assertType} from "./assert";
import {Get} from "./get";
import {Type} from "./type";
import {List, makeList} from "../lib/list/list";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateArrayFromList} from "./create-array-from-list";
import {IteratorKind} from "../type/iterator-kind";

/**
 * https://tc39.es/ecma262/#sec-enumerableownpropertynames
 */
export function EnumerableOwnPropertyNames<T, Kind extends IteratorKind, ElementType = Kind extends "key" ? keyof T : Kind extends "value" ? T[keyof T] : [keyof T, T[keyof T]]>(
	O: T,
	kind: Kind
): List<ElementType> {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Let ownKeys be ? O.[[OwnPropertyKeys]]().
	const ownKeys = internals(O)["[[OwnPropertyKeys]]"]();

	// Let properties be a new empty List.
	const properties = makeList<ElementType>();

	// For each element key of ownKeys in List order, do
	for (let i = 0; i < ownKeys.length; i++) {
		const key = ownKeys.get(i);

		// If Type(key) is String, then
		if (Type(key) === "String") {
			// Let desc be ? O.[[GetOwnProperty]](key).
			const desc = internals(O)["[[GetOwnProperty]]"](key);

			// If desc is not undefined and desc.[[Enumerable]] is true, then
			if (desc !== undefined && desc["[[Enumerable]]"] === true) {
				// If kind is "key", append key to properties.
				if (kind === "key") {
					properties.append((key as unknown) as ElementType);
				}

				// Else,
				else {
					// Let value be ? Get(O, key).
					const value = Get(O, key) as T[keyof T];

					// If kind is "value", append value to properties.
					if (kind === "value") {
						properties.append((value as unknown) as ElementType);
					}

					// Else,
					else {
						// Assert: kind is "key+value".
						assert(kind === "key+value");

						// Let entry be ! CreateArrayFromList(« key, value »).
						const entry = CreateArrayFromList(makeList(key, value));

						// Append entry to properties.
						properties.append((entry as unknown) as ElementType);
					}
				}
			}
		}
	}

	// Order the elements of properties so they are in the same relative order as would be produced by
	// the Iterator that would be returned if the EnumerateObjectProperties internal method were invoked with O.
	// Return properties.
	return properties;
}
