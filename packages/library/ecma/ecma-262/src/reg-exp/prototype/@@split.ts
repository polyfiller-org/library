import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {Set} from "../../abstract-operation/set";
import {RegExpExec} from "../../abstract-operation/reg-exp-exec";
import {getCurrentIntrinsics} from "../../environment/realm/get-current-intrinsics";
import {SpeciesConstructor} from "../../abstract-operation/species-constructor";
import {contains, substring} from "../../algorithm/string";
import {Construct} from "../../abstract-operation/construct";
import {makeList} from "../../lib/list/list";
import {ArrayCreate} from "../../abstract-operation/array-create";
import {MATH_2_TO_THE_POWER_OF_32_MINUS_1} from "../../constant/math-constant";
import {ToUint32} from "../../abstract-operation/to-uint32";
import {CreateDataPropertyOrThrow} from "../../abstract-operation/create-data-property-or-throw";
import {AdvanceStringIndex} from "../../abstract-operation/advance-string-index";
import {ToLength} from "../../abstract-operation/to-length";
import {max, min} from "../../algorithm/math";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";

/**
 * The value of the "name" property of this function is "[Symbol.split]".
 * https://tc39.es/ecma262/#sec-regexp.prototype-@@split
 */
export const regExpPrototypeSymbolSplit = () =>
	(
		OrdinaryGetOwnProperty(
			{
				"[Symbol.split]"(this: RegExp, string: string, limit?: number): string[] {
					// Let rx be the this value.
					const rx = this;

					// If Type(rx) is not Object, throw a TypeError exception.
					if (Type(rx) !== "Object") {
						throw new TypeError(`RegExp.prototype.@@split called on incompatible receiver ${errorFormatArgument(rx)}`);
					}

					// Let S be ? ToString(string).
					const S = ToString(string);

					const intrinsics = getCurrentIntrinsics();

					// Let C be ? SpeciesConstructor(rx, %RegExp%).
					const C = SpeciesConstructor(rx, intrinsics["[[%RegExp%]]"]);

					// Let flags be ? ToString(? Get(rx, "flags")).
					const flags = ToString(Get(rx, "flags"));

					// If flags contains "u", let unicodeMatching be true.
					// Else, let unicodeMatching be false.
					const unicodeMatching = contains(flags, "u");

					// If flags contains "y", let newFlags be flags.
					// Else, let newFlags be the string-concatenation of flags and "y".
					const newFlags = contains(flags, "y") ? flags : `${flags}y`;

					// Let splitter be ? Construct(C, « rx, newFlags »).
					const splitter = Construct(C, makeList(rx, newFlags)) as RegExp;

					// Let A be ! ArrayCreate(0).
					const A = ArrayCreate<string>(0);

					// Let lengthA be 0.
					let lengthA = 0;

					// If limit is undefined, let lim be 2^(32) - 1; else let lim be ? ToUint32(limit).
					const lim = limit === undefined ? MATH_2_TO_THE_POWER_OF_32_MINUS_1 : ToUint32(limit);

					// If lim = 0, return A.
					if (lim === 0) return A;

					// Let size be the length of S.
					const size = S.length;

					// If size = 0, then
					if (size === 0) {
						// Let z be ? RegExpExec(splitter, S).
						const z = RegExpExec(splitter, S);

						// If z is not null, return A.
						if (z !== null) return A;

						// Perform ! CreateDataPropertyOrThrow(A, "0", S).
						CreateDataPropertyOrThrow(A, "0", S);

						// Return A.
						return A;
					}

					// Let p be 0.
					let p = 0;

					// Let q be p.
					let q = p;

					// Repeat, while q < size,
					while (q < size) {
						// Perform ? Set(splitter, "lastIndex", q, true).
						Set(splitter, "lastIndex", q, true);

						// Let z be ? RegExpExec(splitter, S).
						const z = RegExpExec(splitter, S);

						// If z is null, set q to AdvanceStringIndex(S, q, unicodeMatching).
						if (z === null) {
							q = AdvanceStringIndex(S, q, unicodeMatching);
						}

						// Else,
						else {
							// Let e be ? ToLength(? Get(splitter, "lastIndex")).
							let e = ToLength(Get(splitter, "lastIndex"));

							// Set e to min(e, size).
							e = min(e, size);

							// If e = p, set q to AdvanceStringIndex(S, q, unicodeMatching).
							if (e === p) {
								q = AdvanceStringIndex(S, q, unicodeMatching);
							}

							// Else,
							else {
								// Let T be the String value equal to the substring of S consisting of the code units at indices p (inclusive) through q (exclusive).
								// eslint-disable-next-line no-shadow
								const T = substring(S, p, q);

								// Perform ! CreateDataPropertyOrThrow(A, ! ToString(lengthA), T).
								CreateDataPropertyOrThrow(A, ToString(lengthA), T);

								// Set lengthA to lengthA + 1.
								lengthA = lengthA + 1;

								// If lengthA = lim, return A.
								if (lengthA === lim) return A;

								// Set p to e.
								p = e;

								// Let numberOfCaptures be ? LengthOfArrayLike(z).
								let numberOfCaptures = LengthOfArrayLike(z);

								// Set numberOfCaptures to max(numberOfCaptures - 1, 0).
								numberOfCaptures = max(numberOfCaptures - 1, 0);

								// Let i be 1.
								let i = 1;

								// Repeat, while i ≤ numberOfCaptures,
								while (i <= numberOfCaptures) {
									// Let nextCapture be ? Get(z, ! ToString(i)).
									const nextCapture: string = Get(z, ToString(i));

									// Perform ! CreateDataPropertyOrThrow(A, ! ToString(lengthA), nextCapture).
									CreateDataPropertyOrThrow(A, ToString(lengthA), nextCapture);

									// Set i to i + 1.
									i = i + 1;

									// Set lengthA to lengthA + 1.
									lengthA = lengthA + 1;

									// If lengthA = lim, return A.
									if (lengthA === lim) return A;
								}

								// Set q to p.
								q = p;
							}
						}
					}

					// Let T be the String value equal to the substring of S consisting of the code units at indices p (inclusive) through size (exclusive).
					const T = substring(S, p, size);

					// Perform ! CreateDataPropertyOrThrow(A, ! ToString(lengthA), T).
					CreateDataPropertyOrThrow(A, ToString(lengthA), T);

					// Return A.
					return A;
				}
			},
			"[Symbol.split]"
		) as InternalGetAccessorDescriptor
	)["[[Value]]"];
