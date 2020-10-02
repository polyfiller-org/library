import {ToString} from "../../abstract-operation/to-string";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {RegExpExec} from "../../abstract-operation/reg-exp-exec";

/**
 * https://tc39.es/ecma262/#sec-regexp.prototype.test
 */
export const {test: regExpPrototypeTest} = {
	test(this: RegExp, S: string): boolean {
		// Let R be the this value.
		const R = this;

		// If Type(R) is not Object, throw a TypeError exception.
		if (Type(R) !== "Object") {
			throw new TypeError(`RegExp.prototype.test called on incompatible receiver ${errorFormatArgument(R)}`);
		}

		// Let string be ? ToString(S).
		const string = ToString(S);

		// Let match be ? RegExpExec(R, string).
		const match = RegExpExec(R, string);

		// If match is not null, return true; else return false.
		return match !== null;
	}
};
