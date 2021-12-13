import {assertType} from "./assert";
import {CreateDataProperty} from "./create-data-property";
import {ObjectCreate} from "./object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";

/**
 * The abstract operation CreateIterResultObject with arguments value and done creates an object that supports the IteratorResult interface by performing the following steps:
 * https://tc39.github.io/ecma262/#sec-createiterresultobject
 */
export function CreateIterResultObject<T extends {}>(value: T | undefined, done: boolean): IteratorResult<T> {
	// Assert: Type(done) is Boolean.
	assertType(done, "Boolean", `Type of 'done' must be a boolean`, TypeError);

	// Let obj be ObjectCreate(%ObjectPrototype%).
	const obj = ObjectCreate<T>(getCurrentIntrinsics()["[[%ObjectPrototype%]]"]);

	// Perform CreateDataProperty(obj, "value", value).
	CreateDataProperty(obj, "value", value);

	// Perform CreateDataProperty(obj, "done", done).
	CreateDataProperty(obj, "done", done);

	// Return obj.
	return obj as unknown as IteratorResult<T>;
}
