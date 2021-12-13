import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {SameValue} from "../../abstract-operation/same-value";
import {Set} from "../../abstract-operation/set";
import {RegExpExec} from "../../abstract-operation/reg-exp-exec";

/**
 * The value of the "name" property of this function is "[Symbol.search]".
 * https://tc39.es/ecma262/#sec-regexp.prototype-@@search
 */
export const regExpPrototypeSymbolSearch = () =>
	(
		OrdinaryGetOwnProperty(
			{
				"[Symbol.search]"(this: RegExp, string: string): number {
					// Let rx be the this value.
					const rx = this;

					// If Type(rx) is not Object, throw a TypeError exception.
					if (Type(rx) !== "Object") {
						throw new TypeError(`RegExp.prototype.@@search called on incompatible receiver ${errorFormatArgument(rx)}`);
					}

					// Let S be ? ToString(string).
					const S = ToString(string);

					// Let previousLastIndex be ? Get(rx, "lastIndex").
					const previousLastIndex = Get(rx, "lastIndex");

					// If SameValue(previousLastIndex, 0) is false, then
					if (!SameValue(previousLastIndex, 0)) {
						// Perform ? Set(rx, "lastIndex", 0, true).
						Set(rx, "lastIndex", 0, true);
					}

					// Let result be ? RegExpExec(rx, S).
					const result = RegExpExec(rx, S);

					// Let currentLastIndex be ? Get(rx, "lastIndex").
					const currentLastIndex = Get(rx, "lastIndex");

					// If SameValue(currentLastIndex, previousLastIndex) is false, then
					if (!SameValue(currentLastIndex, previousLastIndex)) {
						// Perform ? Set(rx, "lastIndex", previousLastIndex, true).
						Set(rx, "lastIndex", previousLastIndex, true);
					}

					// If result is null, return -1.
					if (result === null) {
						return -1;
					}

					// Return ? Get(result, "index").
					return Get(result, "index");
				}
			},
			"[Symbol.search]"
		) as InternalGetAccessorDescriptor
	)["[[Value]]"];
