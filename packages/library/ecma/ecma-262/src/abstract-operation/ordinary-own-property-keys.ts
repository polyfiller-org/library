import {ToString} from "./to-string";
import {ToNumber} from "./to-number";
import {IsArrayIndex} from "./is-array-index";
import {Type} from "./type";
import {List, makeList} from "../lib/list/list";
import {IsArguments} from "./is-arguments";
import {safeHasOwnProperty} from "../util/safe-has-own-property";

const NATIVE_OBJECT_GET_OWN_PROPERTY_SYMBOLS = Object.getOwnPropertySymbols?.toString().indexOf("[native code]") >= 0 ? Object.getOwnPropertySymbols : undefined;

const NATIVE_OBJECT_GET_OWN_PROPERTY_NAMES = Object.getOwnPropertyNames?.toString().indexOf("[native code]") >= 0 ? Object.getOwnPropertyNames : undefined;

/**
 * https://tc39.es/ecma262/#sec-ordinaryownpropertykeys
 */
export function OrdinaryOwnPropertyKeys<TO>(O: TO): List<PropertyKey> {
	// Let keys be a new empty List.
	const keys = makeList<PropertyKey>();

	if (NATIVE_OBJECT_GET_OWN_PROPERTY_NAMES != null) {
		const names = NATIVE_OBJECT_GET_OWN_PROPERTY_NAMES(O);
		for (let i = 0; i < names.length; i++) {
			const P = names[i];

			// Add P as the last element of keys.
			keys.append(P);
		}
	}

	// We will only be able to iterate over enumerable keys
	else {
		// For each own property key P of O that is an array index, in ascending numeric index order, do
		for (const key in O) {
			if (!safeHasOwnProperty(O, key)) continue;
			const keyAsNumber = ToNumber(key);

			if (IsArrayIndex(keyAsNumber)) {
				// Add P as the last element of keys.
				keys.append(ToString(keyAsNumber));
			}
		}

		// For each own property key P of O that is a String but is not an array index,
		// in ascending chronological order of property creation, do
		for (const P in O) {
			if (!safeHasOwnProperty(O, P)) continue;
			if (Type(P) !== "String") continue;

			const keyAsNumber = ToNumber(P);
			if (!IsArrayIndex(keyAsNumber)) {
				// Add P as the last element of keys.
				keys.append(P);
			}
		}

		// For Argument objects, a 'length' and 'callee' property also exists, but these are not enumerable
		// and thus have to be added manually.
		if (IsArguments(O)) {
			keys.append("length");
			keys.append("callee");
		}
	}

	// For each own property key P of O that is a Symbol,
	// in ascending chronological order of property creation, do
	if (NATIVE_OBJECT_GET_OWN_PROPERTY_SYMBOLS != null) {
		const symbols = NATIVE_OBJECT_GET_OWN_PROPERTY_SYMBOLS(O);
		for (let i = 0; i < symbols.length; i++) {
			const P = symbols[i];

			// Add P as the last element of keys.
			keys.append(P);
		}
	} else {
		// TODO: Handle the case where the engine does not natively support Symbols.
		//       It should still be possible to differentiate between Symbols and normal
		//       keys under such circumstances
	}

	// Return keys.
	return keys;
}
