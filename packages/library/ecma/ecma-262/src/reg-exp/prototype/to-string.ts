import {ToString} from "../../abstract-operation/to-string";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {Get} from "../../abstract-operation/get";

/**
 * https://tc39.es/ecma262/#sec-regexp.prototype.tostring
 */
export const {toString: regExpPrototypeToString} = {
	toString(this: RegExp): string {
		// Let R be the this value.
		const R = this;

		// If Type(R) is not Object, throw a TypeError exception.
		if (Type(R) !== "Object") {
			throw new TypeError(`RegExp.prototype.toString called on incompatible receiver ${errorFormatArgument(R)}`);
		}

		// Let pattern be ? ToString(? Get(R, "source")).
		const pattern = ToString(Get(R, "source"));

		// Let flags be ? ToString(? Get(R, "flags")).
		const flags = ToString(Get(R, "flags"));

		// Let result be the string-concatenation of "/", pattern, "/", and flags.
		const result = `/${pattern}/${flags}`;

		// Return result.
		return result;
	}
};
