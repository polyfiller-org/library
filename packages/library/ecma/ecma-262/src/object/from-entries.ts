import {RequireObjectCoercible} from "../abstract-operation/require-object-coercible";
import {ObjectCreate} from "../abstract-operation/object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {assert} from "../abstract-operation/assert";
import {internals} from "../lib/internal-slot-map/internals";
import {CreateDataPropertyOnObject} from "../algorithm/create-data-property-on-object-functions";
import {CreateBuiltinFunction} from "../abstract-operation/create-builtin-function";
import {makeList} from "../lib/list/list";
import {AddEntriesFromIterable} from "../abstract-operation/add-entries-from-iterable";

/**
 * https://tc39.es/ecma262/#sec-object.fromentries
 */
export const {fromEntries: objectFromEntries} = {
	fromEntries<T>(iterable: Iterable<readonly [PropertyKey, T]>) {
		// Perform ? RequireObjectCoercible(iterable).
		RequireObjectCoercible(iterable);

		// Let obj be ObjectCreate(%Object.prototype%).
		const obj = ObjectCreate<object>(getCurrentIntrinsics()["[[%ObjectPrototype%]]"]);

		// Assert: obj is an extensible ordinary object with no own properties.
		assert(internals(obj)["[[IsExtensible]]"]());

		// Let stepsDefine be the algorithm steps defined in CreateDataPropertyOnObject Functions.
		const stepsDefine = CreateDataPropertyOnObject;

		// Let adder be ! CreateBuiltinFunction(stepsDefine, « »).
		const adder = CreateBuiltinFunction(stepsDefine, makeList());

		// Return ? AddEntriesFromIterable(obj, iterable, adder).
		return AddEntriesFromIterable(obj, iterable, adder);
	}
};
