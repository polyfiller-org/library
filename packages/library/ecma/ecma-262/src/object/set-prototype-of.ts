import {internals} from "../lib/internal-slot-map/internals";
import {RequireObjectCoercible} from "../abstract-operation/require-object-coercible";
import {Type} from "../abstract-operation/type";
import {errorFormatArgument} from "../util/error-format-argument";

/**
 * https://tc39.es/ecma262/#sec-object.setprototypeof
 */
export const {setPrototypeOf: objectSetPrototypeOf} = {
	setPrototypeOf<O, Proto>(O: O, proto: Proto) {
		// Set O to ? RequireObjectCoercible(O).
		O = RequireObjectCoercible(O);

		// If Type(proto) is neither Object nor Null, throw a TypeError exception.
		if (Type(proto) !== "Object" && Type(proto) !== "Null") {
			throw new TypeError(`Object prototype may only be an Object or null: ${errorFormatArgument(proto)}`);
		}

		// If Type(O) is not Object, return O.
		if (Type(O) !== "Object") {
			return O;
		}

		// Let status be ? O.[[SetPrototypeOf]](proto).
		const status = internals(O)["[[SetPrototypeOf]]"](proto);

		// If status is false, throw a TypeError exception.
		if (status === false) {
			throw new TypeError();
		}

		// Return O.
		return O;
	}
};
