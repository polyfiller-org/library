import {ToString} from "./to-string";
import {EcmascriptLanguageType, EcmascriptLanguageTypesToTypes} from "../type/ecmascript-language-type";
import {Type} from "./type";
import {LengthOfArrayLike} from "./length-of-array-like";
import {Get} from "./get";
import {List, makeList} from "../lib/list/list";

/**
 * The abstract operation CreateListFromArrayLike is used to create a List value whose elements are
 * provided by the indexed properties of an array-like object, obj. The optional argument elementTypes
 * is a List containing the names of ECMAScript Language Types that are allowed for element values of the
 * List that is created.
 * https://tc39.es/ecma262/#sec-createlistfromarraylike
 */
export function CreateListFromArrayLike<T, Types extends List<EcmascriptLanguageType>>(
	obj: ArrayLike<T>,
	elementTypes: Types
): List<EcmascriptLanguageTypesToTypes<Types>>;
export function CreateListFromArrayLike<T>(obj: ArrayLike<T>): List<EcmascriptLanguageTypesToTypes<List<EcmascriptLanguageType>>>;
export function CreateListFromArrayLike<T, Types extends List<EcmascriptLanguageType>>(
	obj: ArrayLike<T>,
	elementTypes?: Types
): List<EcmascriptLanguageTypesToTypes<List<EcmascriptLanguageType>>> {
	// If elementTypes is not present, set elementTypes to « Undefined, Null, Boolean, String, Symbol, Number, Object ».
	if (elementTypes === undefined) {
		elementTypes = (makeList("Undefined", "Null", "Boolean", "String", "Symbol", "Number", "Object") as unknown) as Types;
	}

	// If Type(obj) is not Object, throw a TypeError exception.
	if (Type(obj) !== "Object") {
		throw new TypeError(`CreateListFromArrayLike called on non-object`);
	}

	// Let len be ? LengthOfArrayLike(obj).
	const len = LengthOfArrayLike(obj);

	// Let list be a new empty List.
	const list = makeList();

	// Let index be 0.
	let index = 0;

	// Repeat, while index < len
	while (index < len) {
		// Let indexName be ! ToString(index).
		const indexName = ToString(index);

		// Let next be ? Get(obj, indexName).
		const next = Get(obj, indexName);

		// If Type(next) is not an element of elementTypes, throw a TypeError exception.
		// Note that we may use Array.prototype.indexOf directly since this is part of ES3
		if (elementTypes.indexOf(Type(next)) === -1) {
			throw new TypeError();
		}

		// Append next as the last element of list.
		list.append(next);

		// Set index to index + 1.
		index = index + 1;
	}

	// Return list.
	return (list as unknown) as List<EcmascriptLanguageTypesToTypes<List<EcmascriptLanguageType>>>;
}
