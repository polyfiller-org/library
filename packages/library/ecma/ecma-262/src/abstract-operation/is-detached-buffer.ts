import {Type} from "./type";
import {assert} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";

export function IsDetachedBuffer(arrayBuffer: ArrayBuffer): boolean {
	// Assert: Type(arrayBuffer) is Object and it has an [[ArrayBufferData]] internal slot.
	const internalSlots = internals(arrayBuffer);
	assert(Type(arrayBuffer) === "Object" && "[[ArrayBufferData]]" in internalSlots);

	// If arrayBuffer.[[ArrayBufferData]] is null, return true.
	if (internalSlots["[[ArrayBufferData]]"] === null) {
		return true;
	}

	// Return false.
	return false;
}
