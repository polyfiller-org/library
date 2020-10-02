import {assertType} from "./assert";
import {ToBoolean} from "./to-boolean";
import {Get} from "./get";

/**
 * https://tc39.es/ecma262/#sec-iteratorcomplete
 * @param {IteratorResult<T>} iterResult
 * @returns {boolean}
 */
export function IteratorComplete<T>(iterResult: IteratorResult<T>): boolean {
	// Assert: Type(iterResult) is Object.
	assertType(iterResult, "Object", `Argument on position 0 must be an IteratorResult`, TypeError);

	// Return ! ToBoolean(? Get(iterResult, "done")).
	return ToBoolean(Get(iterResult, "done"));
}
