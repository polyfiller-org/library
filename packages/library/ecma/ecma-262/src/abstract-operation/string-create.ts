import {assertType} from "./assert";
import {internals} from "../lib/internal-slot-map/internals";
import {__StringGetOwnProperty__} from "../internal-slot/string/get-own-property";
import {__StringDefineOwnProperty__} from "../internal-slot/string/define-own-property";
import {__StringOwnPropertyKeys__} from "../internal-slot/string/own-property-keys";

/**
 * The abstract operation StringCreate with arguments value and prototype is used to specify the creation
 * of new String exotic objects.
 * https://tc39.es/ecma262/#sec-stringcreate
 */
export function StringCreate(value: string, prototype: object | null = null): string {
	// Assert: Type(value) is String.
	assertType(value, "String", `Argument on position 0 must be of type String`, TypeError);

	// Let S be a newly created String exotic object with a [[StringData]] internal slot.
	const S = String(value);
	// Set S.[[StringData]] to value.
	internals(S)["[[StringData]]"] = value;
	// Set S's essential internal methods to the default ordinary object definitions specified in 9.1.
	// Set S.[[GetOwnProperty]] as specified in 9.4.3.1.
	internals(S)["[[GetOwnProperty]]"] = __StringGetOwnProperty__.bind(S);
	// Set S.[[DefineOwnProperty]] as specified in 9.4.3.2.
	internals(S)["[[DefineOwnProperty]]"] = __StringDefineOwnProperty__.bind(S);
	// Set S.[[OwnPropertyKeys]] as specified in 9.4.3.3.
	internals(S)["[[OwnPropertyKeys]]"] = __StringOwnPropertyKeys__.bind(S);
	// Set S.[[Prototype]] to prototype.
	internals(S)["[[Prototype]]"] = prototype;
	// Set S.[[Extensible]] to true.
	internals(S)["[[Extensible]]"] = true;

	// Let length be the number of code unit elements in value.
	// Perform ! DefinePropertyOrThrow(S, "length", PropertyDescriptor { [[Value]]: length, [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }).
	// Return S.
	return S;
}
