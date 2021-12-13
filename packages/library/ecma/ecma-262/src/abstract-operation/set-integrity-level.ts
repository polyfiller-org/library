import {makeList} from "../lib/list/list";
import {assert, assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";
import {DefinePropertyOrThrow} from "./define-property-or-throw";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";

export const INTEGRITY_LEVEL = makeList("frozen" as const, "sealed" as const);

export type IntegrityLevel = "frozen" | "sealed";

/**
 * The abstract operation SetIntegrityLevel is used to fix the set of own properties of an object.
 * https://tc39.es/ecma262/#sec-setintegritylevel
 */
export function SetIntegrityLevel<T>(O: T, level: IntegrityLevel): boolean {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Assert: level is either "sealed" or "frozen".
	assert(INTEGRITY_LEVEL.has(level));

	// Let status be ? O.[[PreventExtensions]]().
	const status = internals(O)["[[PreventExtensions]]"]();

	// If status is false, return false.
	if (status === false) {
		return false;
	}

	// Let keys be ? O.[[OwnPropertyKeys]]().
	const keys = internals(O)["[[OwnPropertyKeys]]"]();

	// If level is "sealed", then
	if (level === "sealed") {
		// For each element k of keys, do
		for (let i = 0; i < keys.length; i++) {
			const k = keys.get(i);

			// Perform ? DefinePropertyOrThrow(O, k, PropertyDescriptor { [[Configurable]]: false }).
			DefinePropertyOrThrow(O, k, {"[[Configurable]]": false});
		}
	}

	// Else,
	else {
		// Assert: level is "frozen".
		assert(level === "frozen");

		// For each element k of keys, do
		for (let i = 0; i < keys.length; i++) {
			const k = keys.get(i);

			// Let currentDesc be ? O.[[GetOwnProperty]](k).
			const currentDesc = internals(O)["[[GetOwnProperty]]"](k);
			let desc: InternalPropertyDescriptor;

			// If currentDesc is not undefined, then
			if (currentDesc !== undefined) {
				// If IsAccessorDescriptor(currentDesc) is true, then
				if (IsAccessorDescriptor(currentDesc) === true) {
					// Let desc be the PropertyDescriptor { [[Configurable]]: false }.
					desc = {"[[Configurable]]": false};
				}

				// Else,
				else {
					// Let desc be the PropertyDescriptor { [[Configurable]]: false, [[Writable]]: false }.
					desc = {"[[Configurable]]": false, "[[Writable]]": false};
				}

				// Perform ? DefinePropertyOrThrow(O, k, desc).
				DefinePropertyOrThrow(O, k, desc);
			}
		}
	}

	// Return true.
	return true;
}
