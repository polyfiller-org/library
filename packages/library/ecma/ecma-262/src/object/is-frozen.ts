import {Type} from "../abstract-operation/type";
import {TestIntegrityLevel} from "../abstract-operation/test-integrity-level";

/**
 * https://tc39.es/ecma262/#sec-object.isfrozen
 */
export const {isFrozen: objectIsFrozen} = {
	isFrozen<T>(O: T): boolean {
		// If Type(O) is not Object, return true.
		if (Type(O) !== "Object") return true;

		// Return ? TestIntegrityLevel(O, "frozen").
		return TestIntegrityLevel(O, "frozen");
	}
};
