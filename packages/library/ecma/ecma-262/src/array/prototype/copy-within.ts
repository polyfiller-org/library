import {ToObject} from "../../abstract-operation/to-object";
import {ToLength} from "../../abstract-operation/to-length";
import {Get} from "../../abstract-operation/get";
import {ToInteger} from "../../abstract-operation/to-integer";
import {ToString} from "../../abstract-operation/to-string";
import {HasProperty} from "../../abstract-operation/has-property";
import {Set} from "../../abstract-operation/set";
import {DeletePropertyOrThrow} from "../../abstract-operation/delete-property-or-throw";
import {max, min} from "../../algorithm/math";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype.copywithin
 */
export const {copyWithin: arrayPrototypeCopyWithin} = {
	copyWithin<T>(this: T[], target: number, start: number): T[] {
		let direction: number;
		const end = arguments.length < 3 ? undefined : (arguments[2] as number | undefined);

		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? ToLength(? Get(O, "length")).
		const len = ToLength(Get(O, "length"));

		// Let relativeTarget be ? ToInteger(target).
		const relativeTarget = ToInteger(target);

		// If relativeTarget < 0, let to be max((len + relativeTarget), 0); else let to be min(relativeTarget, len).
		// NOTE: We can use Math.[min|max] here since both are part of ES3
		let to = relativeTarget < 0 ? max(len + relativeTarget, 0) : min(relativeTarget, len);

		// Let relativeStart be ? ToInteger(start).
		const relativeStart = ToInteger(start);

		// If relativeStart < 0, let from be max((len + relativeStart), 0); else let from be min(relativeStart, len).
		// NOTE: We can use Math.[min|max] here since both are part of ES3
		let from = relativeStart < 0 ? max(len + relativeStart, 0) : min(relativeStart, len);

		// If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
		const relativeEnd = end === undefined ? len : ToInteger(end);

		// If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
		// NOTE: We can use Math.[min|max] here since both are part of ES3
		const final = relativeEnd < 0 ? max(len + relativeEnd, 0) : min(relativeEnd, len);

		// Let count be min(final - from, len - to).
		// NOTE: We can use Math.min here since it is part of ES3
		let count = Math.min(final - from, len - to);

		// If from < to and to < from + count, then
		if (from < to && to < from + count) {
			// Let direction be -1.
			direction = -1;

			// Set from to from + count - 1.
			from = from + count - 1;

			// Set to to to + count - 1.
			to = to + count - 1;
		}

		// Else,
		else {
			// Let direction be 1.
			direction = 1;
		}

		// Repeat, while count > 0
		while (count > 0) {
			// Let fromKey be ! ToString(from).
			const fromKey = ToString(from);

			// Let toKey be ! ToString(to).
			const toKey = ToString(to);

			// Let fromPresent be ? HasProperty(O, fromKey).
			const fromPresent = HasProperty(O, fromKey);

			// If fromPresent is true, then
			if (fromPresent) {
				// Let fromVal be ? Get(O, fromKey).
				const fromVal = Get(O, fromKey);

				// Perform ? Set(O, toKey, fromVal, true).
				Set(O, toKey, fromVal, true);
			}

			// Else fromPresent is false,
			else {
				// Perform ? DeletePropertyOrThrow(O, toKey).
				DeletePropertyOrThrow(O, toKey);
			}

			// Set from to from + direction.
			from = from + direction;

			// Set to to to + direction.
			to = to + direction;

			// Decrease count by 1
			count--;
		}

		// Return O.
		return O;
	}
};
