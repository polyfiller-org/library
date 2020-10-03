import {IteratorRecord} from "./get-iterator";
import {Call} from "./call";
import {Type} from "./type";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-iteratornext
 */
export function IteratorNext<T>(iteratorRecord: IteratorRecord<T>, value?: T): IteratorResult<T> | Promise<IteratorResult<T>> {
	let result: IteratorResult<T> | Promise<IteratorResult<T>>;

	// If value is not present, then
	if (value === undefined) {
		// Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]]).
		result = Call(iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"]);
	}

	// Else,
	else {
		// Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « value »).
		result = Call(iteratorRecord["[[NextMethod]]"] as ArbitraryFunction, iteratorRecord["[[Iterator]]"], makeList(value));
	}

	// If Type(result) is not Object, throw a TypeError exception.
	if (Type(result) !== "Object") {
		throw new TypeError();
	}

	// Return result.
	return result;
}
