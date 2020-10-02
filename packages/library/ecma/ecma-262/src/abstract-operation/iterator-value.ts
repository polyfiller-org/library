import {assertType} from "./assert";
import {Get} from "./get";

/**
 * https://tc39.es/ecma262/#sec-iteratorvalue
 * @param {IteratorResult<T>} iterResult
 * @returns {T}
 */
export function IteratorValue<T>(iterResult: IteratorResult<T>): T {
	// Assert: Type(iterResult) is Object.
	assertType(iterResult, "Object", `Argument on position 0 must be an IteratorResult`, TypeError);

	// Return ? Get(iterResult, "value").
	return Get(iterResult, "value");
}
