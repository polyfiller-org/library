import {OrdinaryDefineOwnProperty} from "./ordinary-define-own-property";
import {ToUint32} from "./to-uint32";
import {ToNumber} from "./to-number";
import {OrdinaryGetOwnProperty} from "./ordinary-get-own-property";
import {IsAccessorDescriptor} from "./is-accessor-descriptor";
import {ToString} from "./to-string";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-arraysetlength
 */
export function ArraySetLength<T>(A: T[], Desc: InternalPropertyDescriptor): boolean {
	// If Desc.[[Value]] is absent, then
	if (!("[[Value]]" in Desc)) {
		// Return OrdinaryDefineOwnProperty(A, "length", Desc).
		return OrdinaryDefineOwnProperty(A, "length", Desc);
	}

	// Let newLenDesc be a copy of Desc.
	const newLenDesc = {...Desc};

	// Let newLen be ? ToUint32(Desc.[[Value]]).
	const newLen = ToUint32(Desc["[[Value]]"]);

	// Let numberLen be ? ToNumber(Desc.[[Value]]).
	const numberLen = ToNumber(Desc["[[Value]]"]);

	// If newLen ≠ numberLen, throw a RangeError exception.
	if (newLen !== numberLen) {
		throw new RangeError();
	}

	// Set newLenDesc.[[Value]] to newLen.
	newLenDesc["[[Value]]"] = newLen;

	// Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
	const oldLenDesc = OrdinaryGetOwnProperty(A, "length");

	// Assert: oldLenDesc will never be undefined or an accessor descriptor
	// because Array objects are created with a length data property that cannot be deleted or reconfigured.
	if (oldLenDesc === undefined || IsAccessorDescriptor(oldLenDesc)) {
		throw new TypeError();
	}

	// Let oldLen be oldLenDesc.[[Value]].
	let oldLen = oldLenDesc["[[Value]]"];

	// If newLen ≥ oldLen, then
	if (newLen >= oldLen) {
		// Return OrdinaryDefineOwnProperty(A, "length", newLenDesc).
		return OrdinaryDefineOwnProperty(A, "length", newLenDesc);
	}

	// If oldLenDesc.[[Writable]] is false, return false.
	if (oldLenDesc["[[Writable]]"] === false) {
		return false;
	}

	let newWritable: boolean;
	let deferSetWritableToFalse = false;

	// If newLenDesc.[[Writable]] is absent or has the value true, let newWritable be true.
	if (!("[[Writable]]" in newLenDesc) || newLenDesc["[[Writable]]"] === true) {
		newWritable = true;
	}

	// Else,
	else {
		// Need to defer setting the [[Writable]] attribute to false in case any elements cannot be deleted.
		deferSetWritableToFalse = true;
		// Let newWritable be false.
		newWritable = false;

		// Set newLenDesc.[[Writable]] to true.
		newLenDesc["[[Writable]]"] = true;
	}

	// Let succeeded be ! OrdinaryDefineOwnProperty(A, "length", newLenDesc).
	const succeeded = OrdinaryDefineOwnProperty(A, "length", newLenDesc);

	// If succeeded is false, return false.
	if (!succeeded) {
		if (deferSetWritableToFalse) {
			OrdinaryDefineOwnProperty(A, "length", {"[[Writable]]": false});
		}
		return false;
	}

	// Repeat, while newLen < oldLen,
	while (newLen < oldLen) {
		// Set oldLen to oldLen - 1.
		oldLen = oldLen - 1;

		// Let deleteSucceeded be ! A.[[Delete]](! ToString(oldLen)).
		const deleteSucceeded = internals(A)["[[Delete]]"](ToString(oldLen)) as unknown as number;
		// If deleteSucceeded is false, then
		if (!deleteSucceeded) {
			// Set newLenDesc.[[Value]] to oldLen + 1.
			newLenDesc["[[Value]]"] = oldLen + 1;

			// If newWritable is false, set newLenDesc.[[Writable]] to false.
			if (newWritable === false) {
				newLenDesc["[[Writable]]"] = false;
			}

			// Perform ! OrdinaryDefineOwnProperty(A, "length", newLenDesc).
			OrdinaryDefineOwnProperty(A, "length", newLenDesc);

			// Return false.
			return false;
		}
	}

	// If newWritable is false, then
	if (!newWritable) {
		// Return OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor { [[Writable]]: false }).
		// This call will always return true.
		return OrdinaryDefineOwnProperty(A, "length", {
			"[[Writable]]": false
		});
	}

	// Return true
	return true;
}
