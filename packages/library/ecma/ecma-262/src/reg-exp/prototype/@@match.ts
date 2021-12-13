import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Get} from "../../abstract-operation/get";
import {Set} from "../../abstract-operation/set";
import {assert} from "../../abstract-operation/assert";
import {ArrayCreate} from "../../abstract-operation/array-create";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";
import {StringifiedIndex} from "../../type/stringified-index";
import {ToLength} from "../../abstract-operation/to-length";
import {RegExpExec} from "../../abstract-operation/reg-exp-exec";
import {AdvanceStringIndex} from "../../abstract-operation/advance-string-index";

/**
 * The value of the "name" property of this function is "[Symbol.match]".
 * https://tc39.es/ecma262/#sec-regexp.prototype-@@match
 */
export const regExpPrototypeSymbolMatch = () =>
	(
		OrdinaryGetOwnProperty(
			{
				"[Symbol.match]"(this: RegExp, string: string): RegExpMatchArray | null {
					// Let rx be the this value.
					const rx = this;

					// If Type(rx) is not Object, throw a TypeError exception.
					if (Type(rx) !== "Object") {
						throw new TypeError(`RegExp.prototype.@@match called on incompatible receiver ${errorFormatArgument(rx)}`);
					}

					// Let S be ? ToString(string).
					const S = ToString(string);

					// Let global be ! ToBoolean(? Get(rx, "global")).
					const global = ToBoolean(Get(rx, "global"));

					// If global is false, then
					if (global === false) {
						// Return ? RegExpExec(rx, S).
						return RegExpExec(rx, S);
					}

					// Else,
					else {
						// Assert: global is true.
						assert(global === true);

						// Let fullUnicode be ! ToBoolean(? Get(rx, "unicode")).
						const fullUnicode = ToBoolean(Get(rx, "unicode"));

						// Perform ? Set(rx, "lastIndex", 0, true).
						Set(rx, "lastIndex", 0, true);

						// Let A be ! ArrayCreate(0).
						const A = ArrayCreate(0) as RegExpMatchArray;

						// Let n be 0.
						let n = 0;

						// Repeat,
						while (true) {
							// Let result be ? RegExpExec(rx, S).
							const result = RegExpExec(rx, S);

							// If result is null, then
							if (result === null) {
								// If n = 0, return null.
								if (n === 0) return null;
								// Return A.
								return A;
							}

							// Else,
							else {
								// Let matchStr be ? ToString(? Get(result, "0")).
								const matchStr = ToString(Get(result, "0")) as StringifiedIndex | "";

								// Perform ! CreateDataPropertyOrThrow(A, ! ToString(n), matchStr).
								CreateDataPropertyOrThrow(A, ToString(n), matchStr);

								// If matchStr is the empty String, then
								if (matchStr === "") {
									// Let thisIndex be ? ToLength(? Get(rx, "lastIndex")).
									const thisIndex = ToLength(Get(rx, "lastIndex"));

									// Let nextIndex be AdvanceStringIndex(S, thisIndex, fullUnicode).
									const nextIndex = AdvanceStringIndex(S, thisIndex, fullUnicode);

									// Perform ? Set(rx, "lastIndex", nextIndex, true).
									Set(rx, "lastIndex", nextIndex, true);
								}

								// Set n to n + 1.
								n = n + 1;
							}
						}
					}
				}
			},
			"[Symbol.match]"
		) as InternalGetAccessorDescriptor
	)["[[Value]]"];
