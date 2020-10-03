import {IteratorRecord} from "./get-iterator";
import {ObjectCreate} from "./object-create";
import {Get} from "./get";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {makeList} from "../lib/list/list";

/**
 * The abstract operation CreateAsyncFromSyncIterator is used to create an
 * async iterator Record from a synchronous iterator Record.
 * https://tc39.es/ecma262/#sec-createasyncfromsynciterator
 */
export function CreateAsyncFromSyncIterator<T>(syncIteratorRecord: IteratorRecord<T>): IteratorRecord<T> {
	const intrinsics = getCurrentIntrinsics();
	// Let asyncIterator be ! ObjectCreate(%AsyncFromSyncIteratorPrototype%, « [[SyncIteratorRecord]] »).
	const asyncIterator: AsyncIterator<T> & {
		"[[SyncIteratorRecord]]": IteratorRecord<T>;
	} = ObjectCreate(intrinsics["[[%AsyncFromSyncIteratorPrototype%]]"], makeList("[[SyncIteratorRecord]]"));

	// Set asyncIterator.[[SyncIteratorRecord]] to syncIteratorRecord.
	asyncIterator["[[SyncIteratorRecord]]"] = syncIteratorRecord;

	// Let nextMethod be ! Get(asyncIterator, "next").
	const nextMethod = Get(asyncIterator, "next");

	// Let iteratorRecord be the Record { [[Iterator]]: asyncIterator, [[NextMethod]]: nextMethod, [[Done]]: false }.
	const iteratorRecord: IteratorRecord<T> = {
		"[[Iterator]]": asyncIterator,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false
	};

	// Return iteratorRecord.
	return iteratorRecord;
}
