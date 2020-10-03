import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Get} from "../../abstract-operation/get";
import {Set} from "../../abstract-operation/set";
import {ToLength} from "../../abstract-operation/to-length";
import {RegExpExec} from "../../abstract-operation/reg-exp-exec";
import {AdvanceStringIndex} from "../../abstract-operation/advance-string-index";
import {IsCallable} from "../../abstract-operation/is-callable";
import {makeList} from "../../lib/list/list";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {max, min} from "../../algorithm/math";
import {getAmountOfCodeUnits} from "../../algorithm/code-unit";
import {ToInteger} from "../../abstract-operation/to-integer";
import {Call} from "../../abstract-operation/call";
import {ToObject} from "../../abstract-operation/to-object";
import {substring} from "../../algorithm/string";
import {GetSubstitution} from "../../abstract-operation/get-substitution";

/**
 * The value of the "name" property of this function is "[Symbol.replace]".
 * https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
 */
export const regExpPrototypeSymbolReplace = () =>
	(OrdinaryGetOwnProperty(
		{
			"[Symbol.replace]"(this: RegExp, string: string, replaceValue: string | ((substring: string, ...args: unknown[]) => string)): string {
				let fullUnicode = false;

				// Let rx be the this value.
				const rx = this;

				// If Type(rx) is not Object, throw a TypeError exception.
				if (Type(rx) !== "Object") {
					throw new TypeError(`RegExp.prototype.@@replace called on incompatible receiver ${errorFormatArgument(rx)}`);
				}

				// Let S be ? ToString(string).
				const S = ToString(string);

				// Let lengthS be the number of code unit elements in S.
				const lengthS = S.length;

				// Let functionalReplace be IsCallable(replaceValue).
				const functionalReplace = IsCallable(replaceValue);

				// If functionalReplace is false, then
				if (functionalReplace === false) {
					// Set replaceValue to ? ToString(replaceValue).
					replaceValue = ToString(replaceValue);
				}

				// Let global be ! ToBoolean(? Get(rx, "global")).
				const global = ToBoolean(Get(rx, "global"));

				// If global is true, then
				if (global === true) {
					// Let fullUnicode be ! ToBoolean(? Get(rx, "unicode")).
					fullUnicode = ToBoolean(Get(rx, "unicode"));

					// Perform ? Set(rx, "lastIndex", 0, true).
					Set(rx, "lastIndex", 0, true);
				}

				// Let results be a new empty List.
				const results = makeList<RegExpExecArray>();

				// Let done be false.
				let done = false;

				// Repeat, while done is false,
				while (done === false) {
					// Let result be ? RegExpExec(rx, S).
					const result = RegExpExec(rx, S);

					// If result is null, set done to true.
					if (result === null) {
						done = true;
					}

					// Else,
					else {
						// Append result to the end of results.
						results.append(result);

						// If global is false, set done to true.
						if (global === false) {
							done = true;
						}

						// Else,
						else {
							// Let matchStr be ? ToString(? Get(result, "0")).
							const matchStr = ToString(Get(result, "0"));

							// If matchStr is the empty String, then
							if (matchStr === "") {
								// Let thisIndex be ? ToLength(? Get(rx, "lastIndex")).
								const thisIndex = ToLength(Get(rx, "lastIndex"));

								// Let nextIndex be AdvanceStringIndex(S, thisIndex, fullUnicode).
								const nextIndex = AdvanceStringIndex(S, thisIndex, fullUnicode);

								// Perform ? Set(rx, "lastIndex", nextIndex, true).
								Set(rx, "lastIndex", nextIndex, true);
							}
						}
					}
				}

				// Let accumulatedResult be the empty String.
				let accumulatedResult = "";

				// Let nextSourcePosition be 0.
				let nextSourcePosition = 0;

				// For each result in results, do
				for (let i = 0; i < results.length; i++) {
					const result = results.get(i);

					// Let nCaptures be ? LengthOfArrayLike(result).
					let nCaptures = LengthOfArrayLike(result);

					// Set nCaptures to max(nCaptures - 1, 0).
					nCaptures = max(nCaptures - 1, 0);

					// Let matched be ? ToString(? Get(result, "0")).
					const matched = ToString(Get(result, "0"));

					// Let matchLength be the number of code units in matched.
					const matchLength = getAmountOfCodeUnits(matched);

					// Let position be ? ToInteger(? Get(result, "index")).
					let position = ToInteger(Get(result, "index"));

					// Set position to max(min(position, lengthS), 0).
					position = max(min(position, lengthS), 0);

					// Let n be 1.
					let n = 1;

					// Let captures be a new empty List.
					const captures = makeList<string>();

					// Repeat, while n ≤ nCaptures,
					while (n <= nCaptures) {
						// Let capN be ? Get(result, ! ToString(n)).
						let capN = Get(result, ToString(n));

						// If capN is not undefined, then
						if (capN !== undefined) {
							// Set capN to ? ToString(capN).
							capN = ToString(capN);
						}

						// Append capN as the last element of captures.
						captures.append(capN);

						// Set n to n + 1.
						n = n + 1;
					}

					// Let namedCaptures be ? Get(result, "groups").
					let namedCaptures = Get(result, "groups");
					let replacement: string;

					// If functionalReplace is true, then
					if (functionalReplace === true) {
						// Let replacerArgs be « matched ».
						const replacerArgs = makeList<string | number | Record<string, string>>(matched);

						// Append in list order the elements of captures to the end of the List replacerArgs.
						for (let j = 0; j < captures.length; j++) {
							replacerArgs.append(captures.get(j));
						}

						// Append position and S to replacerArgs.
						replacerArgs.append(position);
						replacerArgs.append(S);

						// If namedCaptures is not undefined, then
						if (namedCaptures !== undefined) {
							// Append namedCaptures as the last element of replacerArgs.
							replacerArgs.append(namedCaptures);
						}

						// Let replValue be ? Call(replaceValue, undefined, replacerArgs).
						const replValue = Call(replaceValue as (substring: string, ...args: unknown[]) => string, undefined, replacerArgs);

						// Let replacement be ? ToString(replValue).
						replacement = ToString(replValue);
					}

					// Else,
					else {
						// // If namedCaptures is not undefined, then
						if (namedCaptures !== undefined) {
							// Set namedCaptures to ? ToObject(namedCaptures).
							namedCaptures = ToObject(namedCaptures);
						}

						// Let replacement be ? GetSubstitution(matched, S, position, captures, namedCaptures, replaceValue).
						replacement = GetSubstitution(matched, S, position, captures, namedCaptures, replaceValue as string);
					}

					// If position ≥ nextSourcePosition, then
					if (position >= nextSourcePosition) {
						// NOTE: position should not normally move backwards. If it does, it is an indication of an ill-behaving
						// RegExp subclass or use of an access triggered side-effect to change the global flag or other
						// characteristics of rx. In such cases, the corresponding substitution is ignored.

						// Set accumulatedResult to the string-concatenation of the current value of accumulatedResult,
						// the substring of S consisting of the code units from nextSourcePosition (inclusive) up to position (exclusive), and replacement.
						accumulatedResult = accumulatedResult + S.slice(nextSourcePosition, position) + replacement;

						// Set nextSourcePosition to position + matchLength.
						nextSourcePosition = position + matchLength;
					}
				}

				// If nextSourcePosition ≥ lengthS, return accumulatedResult.
				if (nextSourcePosition >= lengthS) {
					return accumulatedResult;
				}

				// Return the string-concatenation of accumulatedResult and the substring of S consisting of the
				// code units from nextSourcePosition (inclusive) up through the final code unit of S (inclusive).
				return accumulatedResult + substring(S, nextSourcePosition);
			}
		},
		"[Symbol.replace]"
	) as InternalGetAccessorDescriptor)["[[Value]]"];
