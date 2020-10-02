import {internals} from "../lib/internal-slot-map/internals";

const NATIVE_OBJECT_PREVENT_EXTENSIONS = Object.preventExtensions?.toString().indexOf("[native code]") >= 0 ? Object.preventExtensions : undefined;

/**
 * https://tc39.es/ecma262/#sec-ordinarypreventextensions
 * @param {O} O
 * @returns {boolean}
 */
export function OrdinaryPreventExtensions<O extends object>(O: O): boolean {
	if (NATIVE_OBJECT_PREVENT_EXTENSIONS != null) {
		NATIVE_OBJECT_PREVENT_EXTENSIONS(O);
	}

	// Set O.[[Extensible]] to false.
	internals(O)["[[Extensible]]"] = false;

	// Return true.
	return true;
}
