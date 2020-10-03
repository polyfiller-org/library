import {ObjectCreate} from "../../abstract-operation/object-create";
import {CreateDataProperty} from "../../abstract-operation/create-data-property";
import {assert} from "../../abstract-operation/assert";
import {makeList} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
 */
export const arrayPrototypeSymbolUnscopables = (() => {
	// Let unscopableList be ObjectCreate(null).
	const unscopableList = ObjectCreate<object>(null);
	const results = makeList<boolean>();

	// Perform CreateDataProperty(unscopableList, "copyWithin", true).
	results.append(CreateDataProperty(unscopableList, "copyWithin", true));

	// Perform CreateDataProperty(unscopableList, "entries", true).
	results.append(CreateDataProperty(unscopableList, "entries", true));

	// Perform CreateDataProperty(unscopableList, "fill", true).
	results.append(CreateDataProperty(unscopableList, "fill", true));

	// Perform CreateDataProperty(unscopableList, "find", true).
	results.append(CreateDataProperty(unscopableList, "find", true));

	// Perform CreateDataProperty(unscopableList, "findIndex", true).
	results.append(CreateDataProperty(unscopableList, "findIndex", true));

	// Perform CreateDataProperty(unscopableList, "flat", true).
	results.append(CreateDataProperty(unscopableList, "flat", true));

	// Perform CreateDataProperty(unscopableList, "flatMap", true).
	results.append(CreateDataProperty(unscopableList, "flatMap", true));

	// Perform CreateDataProperty(unscopableList, "includes", true).
	results.append(CreateDataProperty(unscopableList, "includes", true));

	// Perform CreateDataProperty(unscopableList, "keys", true).
	results.append(CreateDataProperty(unscopableList, "keys", true));

	// Perform CreateDataProperty(unscopableList, "values", true).
	results.append(CreateDataProperty(unscopableList, "values", true));

	// Assert: Each of the above calls returns true.
	for (let i = 0; i < results.length; i++) {
		assert(results.get(i) === true);
	}

	// Return unscopableList.
	return unscopableList;
})();
