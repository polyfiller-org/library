import {RequireInternalSlot} from "../../abstract-operation/require-internal-slot";
import {IsCallable} from "../../abstract-operation/is-callable";
import {errorFormatArgument} from "../../util/error-format-argument";
import {internals} from "../../lib/internal-slot-map/internals";
import {Call} from "../../abstract-operation/call";
import {makeList} from "../../lib/list/list";
import {getMapIndexes} from "../../util/get-map-indexes";

/**
 * https://tc39.es/ecma262/#sec-map.prototype.foreach
 */
export const {forEach: mapPrototypeForEach} = {
	forEach<Key, Value>(this: Map<Key, Value>, callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void) {
		const thisArg = arguments.length < 2 ? undefined : arguments[1];
		const thisArgPresent = arguments.length >= 2;

		// Let M be the this value.
		const M = this;

		// Perform ? RequireInternalSlot(M, [[MapData]]).
		RequireInternalSlot(M, "[[MapData]]");

		// If IsCallable(callbackfn) is false, throw a TypeError exception.
		if (IsCallable(callbackfn) === false) {
			throw new TypeError(`${errorFormatArgument(callbackfn)} is not a function`);
		}

		// If thisArg is present, let T be thisArg; else let T be undefined.
		const T = thisArgPresent ? thisArg : undefined;

		const internalSlots = internals(M);

		// Let entries be the List that is M.[[MapData]].
		const entries = internalSlots["[[MapData]]"];
		const keys = internalSlots["[[MapKeys]]"];

		for (let i = 0; i < keys.length; i++) {
			if (Object.prototype.hasOwnProperty.call(keys, i)) {
				const key = keys.get(i);
				if (key !== undefined) {
					const {mapDataIndex, entryIndex} = getMapIndexes(key["[[Key]]"], entries);

					if (entryIndex != null) {
						const e = entries.get(mapDataIndex).get(entryIndex);
						// Perform ? Call(callbackfn, T, « e.[[Value]], e.[[Key]], M »).
						Call(callbackfn, T, makeList(e["[[Value]]"], e["[[Key]]"], M));
					}
				}
			}
		}

		// Return undefined.
		return undefined;
	}
};
