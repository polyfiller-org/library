import {assert} from "./assert";
import {isLeadingSurrogate} from "../util/is-leading-surrogate";
import {isTrailingSurrogate} from "../util/is-trailing-surrogate";

/**
 * Two code units, lead and trail, that form a UTF-16 surrogate pair are converted to a code point
 * https://tc39.es/ecma262/#sec-utf16decode
 * @param {number} lead
 * @param {number} trail
 * @returns {number}
 */
export function UTF16Decode(lead: number, trail: number): number {
	// Assert: lead is a leading surrogate and trail is a trailing surrogate.
	assert(isLeadingSurrogate(lead) && isTrailingSurrogate(trail));

	// Let cp be (lead - 0xD800) × 0x400 + (trail - 0xDC00) + 0x10000.
	const cp = (lead - 0xd800) * 0x400 + (trail - 0xdc00) + 0x10000;

	// Return the code point cp.
	return cp;
}
