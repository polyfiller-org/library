import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToBoolean} from "../../abstract-operation/to-boolean";
import {Get} from "../../abstract-operation/get";

/**
 * https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
 */
export const regExpPrototypeFlags = (OrdinaryGetOwnProperty(
	{
		get flags(): string {
			// Let R be the this value.
			const R = (this as unknown) as RegExp;

			// If Type(R) is not Object, throw a TypeError exception.
			if (Type(R) !== "Object") {
				throw new TypeError(`RegExp.prototype.flags called on incompatible receiver ${errorFormatArgument(R)}`);
			}

			// Let result be the empty String.
			let result = "";

			// Let global be ! ToBoolean(? Get(R, "global")).
			const global = ToBoolean(Get(R, "global"));

			// If global is true, append the code unit 0x0067 (LATIN SMALL LETTER G) as the last code unit of result.
			if (global === true) {
				result += String.fromCharCode(0x0067);
			}

			// Let ignoreCase be ! ToBoolean(? Get(R, "ignoreCase")).
			const ignoreCase = ToBoolean(Get(R, "ignoreCase"));

			// If ignoreCase is true, append the code unit 0x0069 (LATIN SMALL LETTER I) as the last code unit of result.
			if (ignoreCase === true) {
				result += String.fromCharCode(0x0069);
			}

			// Let multiline be ! ToBoolean(? Get(R, "multiline")).
			const multiline = ToBoolean(Get(R, "multiline"));

			// If multiline is true, append the code unit 0x006D (LATIN SMALL LETTER M) as the last code unit of result.
			if (multiline === true) {
				result += String.fromCharCode(0x006d);
			}

			// Let dotAll be ! ToBoolean(? Get(R, "dotAll")).
			const dotAll = ToBoolean(Get(R, "dotAll"));

			// If dotAll is true, append the code unit 0x0073 (LATIN SMALL LETTER S) as the last code unit of result.
			if (dotAll === true) {
				result += String.fromCharCode(0x0073);
			}

			// Let unicode be ! ToBoolean(? Get(R, "unicode")).
			const unicode = ToBoolean(Get(R, "unicode"));

			// If unicode is true, append the code unit 0x0075 (LATIN SMALL LETTER U) as the last code unit of result.
			if (unicode === true) {
				result += String.fromCharCode(0x0075);
			}

			// Let sticky be ! ToBoolean(? Get(R, "sticky")).
			const sticky = ToBoolean(Get(R, "sticky"));

			// If sticky is true, append the code unit 0x0079 (LATIN SMALL LETTER Y) as the last code unit of result.
			if (sticky === true) {
				result += String.fromCharCode(0x0079);
			}

			// Return result.
			return result;
		}
	},
	"flags"
) as InternalGetAccessorDescriptor)["[[Get]]"];
