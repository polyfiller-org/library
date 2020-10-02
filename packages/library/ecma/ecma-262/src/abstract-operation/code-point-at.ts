import {assert} from "./assert";
import {isLeadingSurrogate} from "../util/is-leading-surrogate";
import {isTrailingSurrogate} from "../util/is-trailing-surrogate";
import {UTF16Decode} from "./utf16-decode";

export interface CodePointRecord {
	"[[CodePoint]]": number;
	"[[CodeUnitCount]]": number;
	"[[IsUnpairedSurrogate]]": boolean;
}

/**
 * The abstract operation CodePointAt interprets a String string as a sequence of UTF-16 encoded
 * code points, as described in 6.1.4, and reads from it a single code point starting with the code
 * unit at index position.
 * https://tc39.es/ecma262/#sec-codepointat
 * @param {string} string
 * @param {number} position
 * @returns {CodePointRecord}
 */
export function CodePointAt(string: string, position: number): CodePointRecord {
	// Let size be the length of string.
	const size = string.length;

	// Assert: position ≥ 0 and position < size.
	assert(position >= 0 && position < size);

	// Let first be the code unit at index position within string.
	const first = string.charCodeAt(position);

	// Let cp be the code point whose numeric value is that of first.
	let cp = first;

	// If first is not a leading surrogate or trailing surrogate, then
	if (!isLeadingSurrogate(first) && !isTrailingSurrogate(first)) {
		// Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: false }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": false
		};
	}

	// If first is a trailing surrogate or position + 1 = size, then
	if (isTrailingSurrogate(first) || position + 1 === size) {
		// Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": true
		};
	}

	// Let second be the code unit at index position + 1 within string.
	const second = string.charCodeAt(position + 1);

	// If second is not a trailing surrogate, then
	if (!isTrailingSurrogate(second)) {
		// Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 1, [[IsUnpairedSurrogate]]: true }.
		return {
			"[[CodePoint]]": cp,
			"[[CodeUnitCount]]": 1,
			"[[IsUnpairedSurrogate]]": true
		};
	}

	// Set cp to ! UTF16Decode(first, second).
	cp = UTF16Decode(first, second);

	// Return the Record { [[CodePoint]]: cp, [[CodeUnitCount]]: 2, [[IsUnpairedSurrogate]]: false }.
	return {
		"[[CodePoint]]": cp,
		"[[CodeUnitCount]]": 2,
		"[[IsUnpairedSurrogate]]": false
	};
}
