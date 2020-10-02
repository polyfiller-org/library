import {Get} from "../abstract-operation/get";
import {IsRegExp} from "../abstract-operation/is-regexp";
import {SameValue} from "../abstract-operation/same-value";
import {Type} from "../abstract-operation/type";
import {internals} from "../lib/internal-slot-map/internals";
import {RegExpInitialize} from "../abstract-operation/reg-exp-initialize";
import {RegExpAlloc} from "../abstract-operation/reg-exp-alloc";

/**
 * https://tc39.es/ecma262/#sec-regexp-pattern-flags
 */
export const {RegExp: RegExpConstructor} = {
	RegExp: function RegExp(pattern: string | RegExp, flags?: string): RegExp {
		const NewTarget = new.target;

		// Let patternIsRegExp be ? IsRegExp(pattern).
		const patternIsRegExp = IsRegExp(pattern);

		// If NewTarget is undefined, then
		if (NewTarget === undefined) {
			// Let newTarget be the active function object.
			const newTarget = this;

			// If patternIsRegExp is true and flags is undefined, then
			if (patternIsRegExp === true && flags === undefined) {
				// Let patternConstructor be ? Get(pattern, "constructor").
				const patternConstructor = Get(pattern, "constructor");

				// If SameValue(newTarget, patternConstructor) is true, return pattern.
				if (SameValue(newTarget, patternConstructor) === true) {
					return pattern as RegExp;
				}
			}
		}

		// Else, let newTarget be NewTarget
		const newTarget = NewTarget;
		const internalSlots = internals(pattern);
		let P: string | RegExp;
		let F: string | undefined;

		// If Type(pattern) is Object and pattern has a [[RegExpMatcher]] internal slot, then
		if (Type(pattern) === "Object" && "[[RegExpMatcher]]" in internalSlots) {
			// Let P be pattern.[[OriginalSource]].
			P = internalSlots["[[OriginalSource]]"];

			// If flags is undefined, let F be pattern.[[OriginalFlags]].
			if (flags === undefined) {
				F = internalSlots["[[OriginalFlags]]"];
			}

			// Else, let F be flags.
			else {
				F = flags;
			}
		}

		// Else if patternIsRegExp is true, then
		else if (patternIsRegExp === true) {
			// Let P be ? Get(pattern, "source").
			P = Get(pattern, "source");

			// If flags is undefined, then
			if (flags === undefined) {
				F = Get(pattern, "flags");
			}

			// Else, let F be flags
			F = flags;
		}

		// Else,
		else {
			// Let P be pattern.
			P = pattern;

			// Let F be flags.
			F = flags;
		}

		// Let O be ? RegExpAlloc(newTarget).
		const O = RegExpAlloc(newTarget);

		// Return ? RegExpInitialize(O, P, F).
		return RegExpInitialize(O, P, F);
	}
};
