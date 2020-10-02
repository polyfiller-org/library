import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {RequireObjectCoercible} from "../../abstract-operation/require-object-coercible";
import {ToString} from "../../abstract-operation/to-string";
import {CreateStringIterator} from "../../abstract-operation/create-string-iterator";

/**
 * When the @@iterator method is called it returns an Iterator object (25.1.1.2)
 * that iterates over the code points of a String value, returning each code point as a String value.
 * The value of the "name" property of this function is "[Symbol.iterator]".
 * https://tc39.es/ecma262/#sec-string.prototype-@@iterator
 */

export const stringPrototypeSymbolIterator = () =>
	(OrdinaryGetOwnProperty(
		{
			"[Symbol.iterator]"() {
				// Let O be ? RequireObjectCoercible(this value).
				const O = RequireObjectCoercible(this);

				// Let S be ? ToString(O).
				const S = ToString(O);

				// Return CreateStringIterator(S).
				return CreateStringIterator(S);
			}
		},
		"[Symbol.iterator]"
	) as InternalGetAccessorDescriptor)["[[Value]]"];
