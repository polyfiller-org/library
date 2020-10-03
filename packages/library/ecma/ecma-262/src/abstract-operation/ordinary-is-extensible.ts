import {internals} from "../lib/internal-slot-map/internals";

const NATIVE_OBJECT_IS_EXTENSIBLE = Object.isExtensible?.toString().indexOf("[native code]") >= 0 ? Object.isExtensible : undefined;

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinaryisextensible
 */
export function OrdinaryIsExtensible<TO extends object>(O: TO): boolean {
	// Return O.[[Extensible]].
	if (NATIVE_OBJECT_IS_EXTENSIBLE != null) {
		const result = NATIVE_OBJECT_IS_EXTENSIBLE(O);
		internals(O)["[[Extensible]]"] = result;
		return result;
	}

	return internals(O)["[[Extensible]]"];
}
