import {Type} from "./type";
import {Get} from "./get";
import {ToBoolean} from "./to-boolean";

/**
 * https://tc39.es/ecma262/#sec-isregexp
 */
export function IsRegExp(argument: unknown | RegExp, ignoreSymbolMatcher = false): argument is RegExp {
	// If Type(argument) is not Object, return false.
	if (Type(argument) !== "Object") return false;

	if (!ignoreSymbolMatcher) {
		// Let matcher be ? Get(argument, @@match).
		const matcher = typeof Symbol !== "undefined" && "match" in Symbol ? Get(argument, Symbol.match as keyof typeof argument) : undefined;

		// If matcher is not undefined, return ! ToBoolean(matcher).
		if (matcher !== undefined) {
			return ToBoolean(matcher);
		}
	}

	// If argument has a [[RegExpMatcher]] internal slot, return true.
	// Return false.
	return Object.prototype.toString.call(argument) === "[object RegExp]";
}
