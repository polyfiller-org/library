import {IteratorRecord} from "./get-iterator";
import {IteratorNext} from "./iterator-next";
import {IteratorComplete} from "./iterator-complete";

/**
 * The abstract operation IteratorStep with argument iteratorRecord requests the next value
 * from iteratorRecord.[[Iterator]] by calling iteratorRecord.[[NextMethod]] and returns either
 * false indicating that the iterator has reached its end or the IteratorResult object if a next
 * value is available.
 * https://tc39.es/ecma262/#sec-iteratorstep
 * @param {IteratorRecord} iteratorRecord
 * @returns {boolean|IteratorResult<T>|Promise<IteratorResult<T>>}
 */
export function IteratorStep<T>(iteratorRecord: IteratorRecord<T>): false | IteratorResult<T> | Promise<IteratorResult<T>> {
	// Let result be ? IteratorNext(iteratorRecord).
	const result = IteratorNext(iteratorRecord);

	// Let done be ? IteratorComplete(result).
	const done = IteratorComplete(result as IteratorResult<T>);

	// If done is true, return false.
	if (done) {
		return false;
	}

	// Return result.
	return result;
}
