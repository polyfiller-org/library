import {Type} from "../abstract-operation/type";
import {SetIntegrityLevel} from "../abstract-operation/set-integrity-level";

/**
 * https://tc39.es/ecma262/#sec-object.freeze
 */
export const {freeze: objectFreeze} = {
	freeze<T>(O: T): T {
		// If Type(O) is not Object, return O.
		if (Type(O) !== "Object") return O;

		// Let status be ? SetIntegrityLevel(O, "frozen").
		const status = SetIntegrityLevel(O, "frozen");

		// If status is false, throw a TypeError exception.
		if (status === false) {
			throw new TypeError();
		}

		// Return O.
		return O;
	}
};
