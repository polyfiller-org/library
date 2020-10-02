import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {internals} from "../../lib/internal-slot-map/internals";
import {SameValue} from "../../abstract-operation/same-value";
import {getCurrentIntrinsics} from "../../environment/realm/get-current-intrinsics";
import {containsCharCode} from "../../algorithm/string";

/**
 * https://tc39.es/ecma262/#sec-get-regexp.prototype.ignorecase
 */
export const regExpPrototypeIgnoreCase = (OrdinaryGetOwnProperty(
	{
		get ignoreCase(): boolean | undefined {
			// Let R be the this value.
			const R = (this as unknown) as RegExp;

			// If Type(R) is not Object, throw a TypeError exception.
			if (Type(R) !== "Object") {
				throw new TypeError(`RegExp.prototype.ignoreCase called on incompatible receiver ${errorFormatArgument(R)}`);
			}

			const internalSlots = internals(R);
			const intrinsics = getCurrentIntrinsics();

			// If R does not have an [[OriginalFlags]] internal slot, then
			if (!("[[OriginalFlags]]" in internalSlots)) {
				// If SameValue(R, %RegExp.prototype%) is true, return undefined.
				if (SameValue(R, intrinsics["[[%RegExpPrototype%]]"]) === true) {
					return undefined;
				} else {
					// Otherwise, throw a TypeError exception.
					throw new TypeError();
				}
			}

			// Let flags be R.[[OriginalFlags]].
			const flags = internalSlots["[[OriginalFlags]]"];

			// If flags contains the code unit 0x0069 (LATIN SMALL LETTER I), return true.
			if (containsCharCode(flags, 0x0069)) {
				return true;
			}

			// Return false.
			return false;
		}
	},
	"ignoreCase"
) as InternalGetAccessorDescriptor)["[[Get]]"];
