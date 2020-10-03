import {Type} from "../abstract-operation/type";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-object.preventextensions
 */
export const {preventExtensions: objectPreventExtensions} = {
	preventExtensions<TO>(O: TO) {
		// If Type(O) is not Object, return O.
		if (Type(O) !== "Object") return O;

		// Let status be ? O.[[PreventExtensions]]().
		const status = internals(O)["[[PreventExtensions]]"]();

		// If status is false, throw a TypeError exception.
		if (status === false) {
			throw new TypeError();
		}

		// Return O.
		return O;
	}
};
