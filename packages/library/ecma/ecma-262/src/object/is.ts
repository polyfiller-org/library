import {SameValue} from "../abstract-operation/same-value";

/**
 * https://tc39.es/ecma262/#sec-object.is
 */
export const {is: objectIs} = {
	is(value1: unknown, value2: unknown) {
		// Return SameValue(value1, value2).
		return SameValue(value1, value2);
	}
};
