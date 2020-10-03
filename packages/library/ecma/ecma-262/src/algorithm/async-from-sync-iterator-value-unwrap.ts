import {CreateIterResultObject} from "../abstract-operation/create-iter-result-object";

/**
 * An async-from-sync iterator value unwrap function is an anonymous built-in function that is used by
 * AsyncFromSyncIteratorContinuation when processing the value property of an IteratorResult object,
 * in order to wait for its value if it is a promise and re-package the result in a new "unwrapped"
 * IteratorResult object. Each async-from-sync iterator value unwrap function has a [[Done]] internal slot.
 * https://tc39.es/ecma262/#sec-async-from-sync-iterator-value-unwrap-functions
 * @returns
 */
export function AsyncFromSyncIteratorValueUnwrap<T>(this: IteratorResult<T>, value: T): IteratorResult<T> {
	// Let F be the active function object.
	const F = this;

	// Return ! CreateIterResultObject(value, F.[[Done]]).
	return CreateIterResultObject(value, F.done!);
}
