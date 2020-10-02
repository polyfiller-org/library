import {assert} from "./assert";
import {Type} from "./type";
import {GetMethod} from "./get-method";
import {Call} from "./call";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {errorFormatArgument} from "../util/error-format-argument";
import {GetV} from "./get-v";
import {CreateAsyncFromSyncIterator} from "./create-async-from-sync-iterator";

export interface IteratorRecord<T> {
	"[[Iterator]]": IterableIterator<T> | AsyncIterator<T>;
	"[[NextMethod]]": Iterator<T>["next"] | AsyncIterator<T>["next"];
	"[[Done]]": boolean;
}

/**
 * https://tc39.es/ecma262/#sec-getiterator
 */
export function GetIterator<T>(
	obj: Iterable<T> | ArrayLike<T> | {[Symbol.iterator](): IterableIterator<T>},
	hint?: "sync" | "async",
	method?: ArbitraryFunction
): IteratorRecord<T> {
	// If hint is not present, set hint to sync.
	if (hint === undefined) {
		hint = "sync";
	}

	// Assert: hint is either sync or async.
	assert(hint === "sync" || hint === "async", `Argument on position 1 must be one of 'sync' or 'async'`, RangeError);

	// If method is not present, then
	if (method === undefined) {
		// If hint is async, then
		if (hint === "async") {
			// Set method to ? GetMethod(obj, @@asyncIterator).
			method = (GetMethod(obj, Symbol.asyncIterator as keyof typeof obj) as unknown) as ArbitraryFunction | undefined;

			// If method is undefined, then
			if (method === undefined) {
				// Let syncMethod be ? GetMethod(obj, @@iterator).
				const syncMethod = GetMethod(obj, Symbol.iterator as keyof typeof obj);

				// Let syncIteratorRecord be ? GetIterator(obj, sync, syncMethod).
				const syncIteratorRecord = GetIterator(obj, "sync", syncMethod);

				// Return ! CreateAsyncFromSyncIterator(syncIteratorRecord).
				return CreateAsyncFromSyncIterator(syncIteratorRecord);
			}
		}

		// Otherwise, set method to ? GetMethod(obj, @@iterator).
		else {
			method = (GetMethod(obj, Symbol.iterator as keyof typeof obj) as unknown) as ArbitraryFunction;
		}
	}

	// Let iterator be ? Call(method, obj).
	const iterator = Call(method, obj) as IterableIterator<T>;

	// If Type(iterator) is not Object, throw a TypeError exception.
	if (Type(iterator) !== "Object") {
		throw new TypeError(`${errorFormatArgument(obj)} is not iterable`);
	}

	// Let nextMethod be ? GetV(iterator, "next").
	const nextMethod = GetV(iterator, "next");

	// Let iteratorRecord be the Record { [[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false }.
	const iteratorRecord: IteratorRecord<T> = {
		"[[Iterator]]": iterator,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false
	};

	// Return iteratorRecord.
	return iteratorRecord;
}
