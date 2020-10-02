import {Type} from "./type";

/**
 * The abstract operation RequireObjectCoercible throws an error if argument is a
 * value that cannot be converted to an Object using ToObject.
 * https://tc39.es/ecma262/#sec-requireobjectcoercible
 * @param {T} argument
 * @return {T}
 */
export function RequireObjectCoercible<T>(argument: T): T {
	const type = Type(argument);
	switch (type) {
		case "Null":
		case "Undefined":
			throw new TypeError(`Argument of type ${type} cannot be converted to an Object`);
		default:
			return argument;
	}
}
