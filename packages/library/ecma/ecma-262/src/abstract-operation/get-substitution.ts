import {assert, assertType} from "./assert";
import {getAmountOfCodeUnits} from "../algorithm/code-unit";
import {IsList} from "../lib/list/is-list";
import {List} from "../lib/list/list";
import {substring} from "../algorithm/string";
import {ToNumber} from "./to-number";
import {Get} from "./get";
import {ToString} from "./to-string";
import {IsNonNegativeInteger} from "./is-non-negative-integer";

/**
 * https://tc39.es/ecma262/#sec-getsubstitution
 */
export function GetSubstitution(matched: string, str: string, position: number, captures: List<string>, namedCaptures: unknown, replacement: string): string {
	// Assert: Type(matched) is String.
	assertType(matched, "String");

	// Let matchLength be the number of code units in matched.
	const matchLength = getAmountOfCodeUnits(matched);

	// Assert: Type(str) is String.
	assertType(str, "String");

	// Let stringLength be the number of code units in str.
	const stringLength = getAmountOfCodeUnits(str);

	// Assert: ! IsNonNegativeInteger(position) is true.
	assert(IsNonNegativeInteger(position));

	// Assert: position ≤ stringLength.
	assert(position <= stringLength);

	// Assert: captures is a possibly empty List of Strings.
	assert(IsList(captures));

	// Assert: Type(replacement) is String.
	assertType(replacement, "String");

	// Let tailPos be position + matchLength.
	const tailPos = position + matchLength;

	// Let m be the number of elements in captures.
	const m = captures.length;

	// Let result be the String value derived from replacement by copying code unit elements from replacement
	// to result while performing replacements as specified in Table 53.
	// These $ replacements are done left-to-right, and, once such a replacement is performed,
	// the new replacement text is not subject to further replacements.
	let result = "";
	let offset = 0;
	const getCurrent = () => replacement[offset];
	const peek = (peekOffset = 1) => replacement[offset + peekOffset];

	while (offset < replacement.length) {
		switch (getCurrent()) {
			case "$": {
				switch (peek(1)) {
					case "$": {
						offset++;
						// We have the sequence: $$. Replace it with: $
						result += "$";
						break;
					}

					case "&": {
						offset++;
						// We have the sequence: $&. Replace it with: `matched`
						result += matched;
						break;
					}

					case "`": {
						offset++;
						// We have the sequence: $`:
						// "If position is 0, the replacement is the empty String.
						// Otherwise the replacement is the substring of str that starts at index 0
						// and whose last code unit is at index position - 1."
						if (position === 0) {
							result += "";
						} else {
							result += substring(str, 0, position - 1);
						}
						break;
					}

					case "'": {
						offset++;
						// We have the sequence: $':
						// "If tailPos ≥ stringLength, the replacement is the empty String.
						// Otherwise the replacement is the substring of str that starts at
						// index tailPos and continues to the end of str."
						if (tailPos >= stringLength) {
							result += "";
						} else {
							result += substring(str, tailPos);
						}
						break;
					}

					case "<": {
						offset++;
						// We have the sequence: $<:
						// If namedCaptures is undefined, the replacement text is the String "$<".
						if (namedCaptures === undefined) {
							result += "$<";
						}

						// Else,
						else {
							// Assert: Type(namedCaptures) is Object.
							assertType(namedCaptures, "Object");

							// Scan until the next > U+003E (GREATER-THAN SIGN).
							let greaterThanIndex = -1;
							for (let i = offset + 1; i < replacement.length; i++) {
								if (replacement[i] === ">") {
									greaterThanIndex = i;
									break;
								}
							}

							// If none is found, the replacement text is the String "$<".
							if (greaterThanIndex === -1) {
								result += "$<";
							}

							// Else,
							else {
								// Let groupName be the enclosed substring.
								const groupName = substring(replacement, offset + 1, greaterThanIndex);

								// Let capture be ? Get(namedCaptures, groupName).
								const capture = Get(namedCaptures, groupName);

								// If capture is undefined, replace the text through > with the empty String.
								if (capture === undefined) {
									result += "";
								}
								// Otherwise, replace the text through > with ? ToString(capture).
								else {
									result += ToString(capture);
								}
							}
						}
						break;
					}

					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9": {
						switch (peek(2)) {
							case "1":
							case "2":
							case "3":
							case "4":
							case "5":
							case "6":
							case "7":
							case "8":
							case "9": {
								offset++;
								offset++;
								// We have the sequence: '$nn' where 'n' is one of: 0 1 2 3 4 5 6 7 8 9
								// "The nnth element of captures, where nn is a two-digit decimal number in the
								// range 01 to 99. If nn ≤ m and the nnth element of captures is undefined, use the empty String instead.
								// If nn is 00 or nn > m, no replacement is done."
								const nn = ToNumber(`${replacement[offset - 1]}${replacement[offset]}`);
								const nnthElement = captures.get(nn);
								if (nn <= m && nnthElement === undefined) {
									result += "";
								} else if (nn !== 0 && nn <= m) {
									result += nnthElement;
								}
								break;
							}

							default: {
								offset++;
								// We have the sequence: '$n' where 'n' is one of: 0 1 2 3 4 5 6 7 8 9 and $n is not followed by a decimal digit
								// "The nth element of captures, where n is a single digit in the range 1 to 9. If n ≤ m and the nth element of
								// captures is undefined, use the empty String instead. If n > m, no replacement is done."
								const n = ToNumber(replacement[offset - 1]);
								const nthElement = captures.get(n);
								if (n <= m && nthElement === undefined) {
									result += "";
								} else if (n <= m) {
									result += captures;
								}
								break;
							}
						}
						break;
					}

					default: {
						offset++;
						// We have the sequence: $.
						result += `$`;
						break;
					}
				}
			}
		}
	}

	// Return result.
	return result;
}
