import {ToPrimitive} from "./to-primitive";
import {HINT_STRING} from "../hint/string";
import {Type} from "./type";
import {ToString} from "./to-string";

/**
 * The abstract operation ToBoolean converts argument to a value of type Boolean
 * https://tc39.es/ecma262/#sec-topropertykey
 */
export function ToPropertyKey(argument: unknown): PropertyKey {
	// Let key be ? ToPrimitive(argument, hint String).
	const key = ToPrimitive(argument, HINT_STRING);

	// If Type(key) is Symbol, then
	if (Type(key as string | symbol) === "Symbol") {
		return key;
	}

	// Return ! ToString(key).
	return ToString(key);
}
