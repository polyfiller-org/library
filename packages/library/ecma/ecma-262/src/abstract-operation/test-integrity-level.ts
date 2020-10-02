import {assert, assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";
import {INTEGRITY_LEVEL, IntegrityLevel} from "./set-integrity-level";
import {IsExtensible} from "./is-extensible";
import {IsDataDescriptor} from "./is-data-descriptor";

/**
 * The abstract operation TestIntegrityLevel is used to determine if the set of own properties of an object are fixed.
 * https://tc39.es/ecma262/#sec-testintegritylevel
 */
export function TestIntegrityLevel<T>(O: T, level: IntegrityLevel): boolean {
	// Assert: Type(O) is Object.
	assertType(O, "Object");

	// Assert: level is either "sealed" or "frozen".
	assert(INTEGRITY_LEVEL.has(level));

	// Let extensible be ? IsExtensible(O).
	const extensible = IsExtensible(O);

	// If extensible is true, return false.
	if (extensible === true) return false;

	// NOTE: If the object is extensible, none of its properties are examined.

	// Let keys be ? O.[[OwnPropertyKeys]]().
	const keys = internals(O)["[[OwnPropertyKeys]]"]();

	// For each element k of keys, do
	for (let i = 0; i < keys.length; i++) {
		const k = keys.get(i);

		// Let currentDesc be ? O.[[GetOwnProperty]](k).
		const currentDesc = internals(O)["[[GetOwnProperty]]"](k);

		// If currentDesc is not undefined, then
		if (currentDesc !== undefined) {
			// If currentDesc.[[Configurable]] is true, return false.
			if (currentDesc["[[Configurable]]"] === true) return false;

			// If level is "frozen" and IsDataDescriptor(currentDesc) is true, then
			if (level === "frozen" && IsDataDescriptor(currentDesc) === true) {
				// If currentDesc.[[Writable]] is true, return false.
				if (currentDesc["[[Writable]]"] === true) return false;
			}
		}
	}

	// Return true.
	return true;
}
