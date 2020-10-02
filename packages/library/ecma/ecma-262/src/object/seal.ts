import {Type} from "../abstract-operation/type";
import {SetIntegrityLevel} from "../abstract-operation/set-integrity-level";

/**
 * https://tc39.es/ecma262/#sec-object.seal
 */
export const {seal: objectSeal} = {
	seal<T>(O: T): T {
		// If Type(O) is not Object, return O.
		if (Type(O) !== "Object") return O;

		// Let status be ? SetIntegrityLevel(O, "sealed").
		const status = SetIntegrityLevel(O, "sealed");

		// If status is false, throw a TypeError exception.
		if (status === false) {
			throw new TypeError();
		}

		// Return O.
		return O;
	}
};
