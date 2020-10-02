import {assert, assertType} from "./assert";
import {IsRegExp} from "./is-regexp";

/**
 * https://tc39.es/ecma262/#sec-regexpbuiltinexec
 */
export function RegExpBuiltinExec(R: RegExp, S: string): RegExpExecArray | null {
	// Assert: R is an initialized RegExp instance.
	assert(IsRegExp(R));

	// Assert: Type(S) is String.
	assertType(S, "String");

	throw new Error("Not implemented");

	/*
	// Let length be the number of code units in S.
	const length = S.length;

	// Let lastIndex be ? ToLength(? Get(R, "lastIndex")).
	let lastIndex = ToLength(Get(R, "lastIndex"));

	// Let flags be R.[[OriginalFlags]].
	const flags = internals(R)["[[OriginalFlags]]"];

	// If flags contains "g", let global be true; else let global be false.
	const global = flags.indexOf("g") >= 0;

	// If flags contains "y", let sticky be true; else let sticky be false.
	const sticky = flags.indexOf("y") >= 0;

	// If global is false and sticky is false, set lastIndex to 0.
	if (global === false && sticky === false) {
		lastIndex = 0;
	}

	// Let matcher be R.[[RegExpMatcher]].
	const matcher = internals(R)["[[RegExpMatcher]]"];

	// If flags contains "u", let fullUnicode be true; else let fullUnicode be false.
	const fullUnicode = flags.indexOf("u") >= 0;

	// Let matchSucceeded be false.
	let matchSucceeded = false;

	// Repeat, while matchSucceeded is false
	while (matchSucceeded === false) {
		// If lastIndex > length, then
		if (lastIndex > length) {
			// If global is true or sticky is true, then
			if (global === true || sticky === true) {
				// Perform ? Set(R, "lastIndex", 0, true).
				Set(R, "lastIndex", 0, true);
			}

			// Return null
			return null;
		}

		// Let r be matcher(S, lastIndex).
		const r = matcher(S, lastIndex);

		// If r is failure, then
		if (r === failure) {
			// If sticky is true, then
			if (sticky === true) {
				// Perform ? Set(R, "lastIndex", 0, true).
				Set(R, "lastIndex", 0, true);

				// Return null.
				return null;
			}

			// Set lastIndex to AdvanceStringIndex(S, lastIndex, fullUnicode).
			lastIndex = AdvanceStringIndex(S, lastIndex, fullUnicode);
		}

		// Else,
		else {
			// Assert: r is a State.

			// Set matchSucceeded to true.
			matchSucceeded = true;
		}
	}

	 */
}
