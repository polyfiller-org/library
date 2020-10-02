import {Set} from "../abstract-operation/set";
import {ToObject} from "../abstract-operation/to-object";
import {internals} from "../lib/internal-slot-map/internals";
import {Get} from "../abstract-operation/get";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-object.assign
 */
export const {assign: objectAssign} = {
	assign<T, U>(target: T, _firstSource: U): T & U {
		// Let to be ? ToObject(target).
		const to = ToObject(target);

		// If only one argument was passed, return to.
		if (arguments.length === 1) return to as T & U;

		// Let sources be the List of argument values starting with the second argument.
		let sources = makeList<U>();
		for (let i = 1; i < arguments.length; i++) {
			sources.append(arguments[i]);
		}

		// For each element nextSource of sources, in ascending index order, do
		for (let i = 0; i < sources.length; i++) {
			const nextSource = sources.get(i);

			// If nextSource is neither undefined nor null, then
			if (nextSource != null) {
				// Let from be ! ToObject(nextSource).
				const from = ToObject(nextSource);

				// Let keys be ? from.[[OwnPropertyKeys]]().
				const keys = internals(from)["[[OwnPropertyKeys]]"]();

				// For each element nextKey of keys in List order, do
				for (let j = 0; j < keys.length; j++) {
					const nextKey = keys.get(j);

					// Let desc be ? from.[[GetOwnProperty]](nextKey).
					const desc = internals(from)["[[GetOwnProperty]]"](nextKey);

					// If desc is not undefined and desc.[[Enumerable]] is true, then
					if (desc !== undefined && desc["[[Enumerable]]"] === true) {
						// Let propValue be ? Get(from, nextKey).
						const propValue = Get(from, nextKey as keyof typeof from);

						// Perform ? Set(to, nextKey, propValue, true).
						Set(to, nextKey as keyof typeof to, propValue, true);
					}
				}
			}
		}

		// Return to.
		return to as T & U;
	}
};
