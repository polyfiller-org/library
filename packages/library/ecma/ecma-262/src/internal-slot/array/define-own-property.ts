import {assert} from "../../abstract-operation/assert";
import {IsPropertyKey} from "../../abstract-operation/is-property-key";
import {IsArrayIndex} from "../../abstract-operation/is-array-index";
import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {IsAccessorDescriptor} from "../../abstract-operation/is-accessor-descriptor";
import {ToUint32} from "../../abstract-operation/to-uint32";
import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {ArraySetLength} from "../../abstract-operation/array-set-length";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";

/**
 * https://tc39.es/ecma262/#sec-array-exotic-objects-defineownproperty-p-desc
 */
export function __ArrayDefineOwnProperty__<T>(this: T[], P: PropertyKey, Desc: InternalPropertyDescriptor) {
	// Assert: IsPropertyKey(P) is true.
	assert(IsPropertyKey(P), `Argument at position 0 must be a PropertyKey`, TypeError);

	// If P is "length", then
	if (P === "length") {
		// Return ? ArraySetLength(A, Desc).
		return ArraySetLength(this, Desc);
	}

	// Else if P is an array index, then
	else if (IsArrayIndex(P)) {
		// Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
		const oldLenDesc = OrdinaryGetOwnProperty(this, "length");

		// Assert: oldLenDesc will never be undefined or an accessor descriptor because
		// Array objects are created with a length data property that cannot be deleted or reconfigured.
		if (oldLenDesc === undefined || IsAccessorDescriptor(oldLenDesc)) {
			throw new TypeError();
		}

		// Let oldLen be oldLenDesc.[[Value]].
		const oldLen = oldLenDesc["[[Value]]"];

		// Let index be ! ToUint32(P).
		const index = ToUint32(P);

		// If index ≥ oldLen and oldLenDesc.[[Writable]] is false, return false.
		if (index >= oldLen && oldLenDesc["[[Writable]]"] === false) {
			return false;
		}

		// Let succeeded be ! OrdinaryDefineOwnProperty(A, P, Desc).
		let succeeded = OrdinaryDefineOwnProperty(this, P, Desc);

		// If succeeded is false, return false.
		if (!succeeded) return false;

		// If index ≥ oldLen, then
		if (index >= oldLen) {
			// Set oldLenDesc.[[Value]] to index + 1.
			oldLenDesc["[[Value]]"] = index + 1;

			// Let succeeded be OrdinaryDefineOwnProperty(A, "length", oldLenDesc).
			succeeded = OrdinaryDefineOwnProperty(this, "length", oldLenDesc);

			// Assert: succeeded is true.
			assert(succeeded);
		}

		// Return true.
		return true;
	}

	// Return OrdinaryDefineOwnProperty(A, P, Desc).
	return OrdinaryDefineOwnProperty(this, P, Desc);
}
