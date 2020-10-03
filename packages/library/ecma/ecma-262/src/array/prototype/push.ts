import {ToObject} from "../../abstract-operation/to-object";
import {Set} from "../../abstract-operation/set";
import {LengthOfArrayLike} from "../../abstract-operation/length-of-array-like";
import {ToString} from "../../abstract-operation/to-string";
import {MATH_2_TO_THE_POWER_OF_53_MINUS_1} from "../../constant/math-constant";

/**
 * https://tc39.es/ecma262/#sec-array.prototype.push
 */
export const {push: arrayPrototypePush} = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	push<T>(this: T[], _item: T): number {
		// Let O be ? ToObject(this value).
		const O = ToObject(this);

		// Let len be ? LengthOfArrayLike(O).
		let len = LengthOfArrayLike(O);

		// Let items be a List whose elements are, in left to right order,
		// the arguments that were passed to this function invocation.
		const items = arguments;

		// Let argCount be the number of elements in items.
		const argCount = items.length;

		// If len + argCount > (2^53) - 1, throw a TypeError exception.
		if (len + argCount > MATH_2_TO_THE_POWER_OF_53_MINUS_1) {
			throw new TypeError();
		}

		// Repeat, while items is not empty
		for (let i = 0; i < items.length; i++) {
			const E = arguments[i];

			// Perform ? Set(O, ! ToString(len), E, true).
			Set(O, ToString(len), E, true);

			// Set len to len + 1.
			len = len + 1;
		}

		// Perform ? Set(O, "length", len, true).
		Set(O, "length", len, true);

		// Return len.
		return len;
	}
};
