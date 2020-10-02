import {assert} from "./assert";
import {OrdinaryDefineOwnProperty} from "./ordinary-define-own-property";
import {ObjectCreate} from "./object-create";
import {SameValue} from "./same-value";
import {IsInteger} from "./is-integer";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {internals} from "../lib/internal-slot-map/internals";
import {__ArrayDefineOwnProperty__} from "../internal-slot/array/define-own-property";
import {MATH_2_TO_THE_POWER_OF_32_MINUS_1} from "../constant/math-constant";
import {NATIVE_SYMBOL_TO_STRING_TAG} from "../symbol/native/native";

/**
 * The abstract operation ArrayCreate with argument length (either 0 or a positive integer)
 * and optional argument proto is used to specify the creation of new Array exotic objects.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-arraycreate
 * @param {number} length
 * @param {object} proto
 */
export function ArrayCreate<T>(length: number, proto?: object): T[] {
	// Assert: length is an integer Number ≥ 0.
	assert(IsInteger(length) && length >= 0, `Invalid input: argument on position 0 must be a non-negative Integer`, RangeError);

	// If length is -0, set length to +0.
	if (SameValue(length, -0)) {
		length = +0;
	}

	// If length > 2^32 - 1, throw a RangeError exception.
	// NOTE: We can use Math.pow directly since this is part of ES3
	if (length > MATH_2_TO_THE_POWER_OF_32_MINUS_1) {
		throw new RangeError(`Invalid input: argument on position 0 must be a non-negative Integer within the range 2^32 -1`);
	}

	const intrinsics = getCurrentIntrinsics();

	// If proto is not present, set proto to the intrinsic object %ArrayPrototype%.
	if (proto === undefined) {
		proto = intrinsics["[[%ArrayPrototype%]]"];
	}

	if (proto === intrinsics["[[%ArrayPrototype%]]"]) {
		return intrinsics["[[%Array%]]"](length);
	} else {
		// Let A be a newly created Array exotic object.
		let A = ObjectCreate<T[]>(proto);
		// Set A's essential internal methods except for [[DefineOwnProperty]] to the default ordinary object definitions specified in 9.1.
		// Set A.[[DefineOwnProperty]] as specified in 9.4.2.1.
		internals(A)["[[DefineOwnProperty]]"] = __ArrayDefineOwnProperty__.bind(A);
		// Set A.[[Prototype]] to proto.
		internals(A)["[[Prototype]]"] = proto;
		// Set A.[[Extensible]] to true.
		internals(A)["[[Extensible]]"] = true;
		// Perform ! OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor { [[Value]]: length, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }).
		OrdinaryDefineOwnProperty(A, "length", {
			"[[Value]]": length,
			"[[Writable]]": true,
			"[[Enumerable]]": false,
			"[[Configurable]]": false
		});

		// Set the @@toStringTag descriptor value
		OrdinaryDefineOwnProperty(A, Symbol.toStringTag, {
			"[[Value]]": "Array",
			"[[Writable]]": false,
			"[[Enumerable]]": false,
			"[[Configurable]]": true
		});

		// If Symbols are polyfilled in an engine with native Symbol support, also set the proper @@toStringTag
		if (NATIVE_SYMBOL_TO_STRING_TAG != null && NATIVE_SYMBOL_TO_STRING_TAG !== Symbol.toStringTag) {
			OrdinaryDefineOwnProperty(A, NATIVE_SYMBOL_TO_STRING_TAG, {
				"[[Value]]": "Array",
				"[[Writable]]": false,
				"[[Enumerable]]": false,
				"[[Configurable]]": true
			});
		}

		// Return A.
		return A;
	}
}
