import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {internals} from "../../lib/internal-slot-map/internals";
import {SameValue} from "../../abstract-operation/same-value";
import {getCurrentIntrinsics} from "../../environment/realm/get-current-intrinsics";
import {assert} from "../../abstract-operation/assert";
import {EscapeRegExpPattern} from "../../abstract-operation/escape-reg-exp-pattern";

/**
 * https://tc39.es/ecma262/#sec-get-regexp.prototype.source
 */
export const regExpPrototypeSource = (
	OrdinaryGetOwnProperty(
		{
			get source(): string {
				// Let R be the this value.
				const R = this as unknown as RegExp;

				// If Type(R) is not Object, throw a TypeError exception.
				if (Type(R) !== "Object") {
					throw new TypeError(`RegExp.prototype.source called on incompatible receiver ${errorFormatArgument(R)}`);
				}

				const internalSlots = internals(R);
				const intrinsics = getCurrentIntrinsics();

				// If R does not have an [[OriginalSource]] internal slot, then
				if (!("[[OriginalFlags]]" in internalSlots)) {
					// If SameValue(R, %RegExp.prototype%) is true, return "(?:)".
					if (SameValue(R, intrinsics["[[%RegExpPrototype%]]"]) === true) {
						return "(?:)";
					} else {
						// Otherwise, throw a TypeError exception.
						throw new TypeError();
					}
				}

				// Assert: R has an [[OriginalFlags]] internal slot.
				assert("[[OriginalFlags]]" in internalSlots);

				// Let src be R.[[OriginalSource]].
				const src = internalSlots["[[OriginalSource]]"];

				// Let flags be R.[[OriginalFlags]].
				const flags = internalSlots["[[OriginalFlags]]"];

				// Return EscapeRegExpPattern(src, flags).
				return EscapeRegExpPattern(src, flags);
			}
		},
		"source"
	) as InternalGetAccessorDescriptor
)["[[Get]]"];
