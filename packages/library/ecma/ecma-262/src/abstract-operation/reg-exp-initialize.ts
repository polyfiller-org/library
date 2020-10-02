import {ToString} from "./to-string";
import {makeList} from "../lib/list/list";
import {IsList} from "../lib/list/is-list";
import {internals} from "../lib/internal-slot-map/internals";
import {ParseNode, ParsePattern} from "./parse-pattern";
import {Set} from "./set";
import {failure} from "../type/failure";

/**
 * https://tc39.es/ecma262/#sec-regexpinitialize
 */
export function RegExpInitialize(obj: unknown, pattern: unknown | undefined, flags: unknown | undefined): RegExp {
	// If pattern is undefined, let P be the empty String.
	// Else, let P be ? ToString(pattern).
	const P = pattern === undefined ? "" : ToString(pattern);

	// If flags is undefined, let F be the empty String.
	// Else, let F be ? ToString(flags).
	const F = flags === undefined ? "" : ToString(flags);

	// If F contains any code unit other than "g", "i", "m", "s", "u", or "y" or if it contains the same code unit more than once, throw a SyntaxError exception.
	const seenFlags = makeList();
	const acceptableFlags = makeList("g", "i", "m", "s", "u", "y");
	for (let i = 0; i < F.length; i++) {
		const codeUnit = F[i];

		if (seenFlags.has(codeUnit) || !acceptableFlags.has(codeUnit)) {
			throw new SyntaxError(`Invalid regular expression flags`);
		}

		seenFlags.append(codeUnit);
	}

	// If F contains "u", let u be true; else let u be false.
	const u = seenFlags.has("u");

	// If u is true, then
	// Let patternText be ! StringToCodePoints(P).
	// Let patternCharacters be a List whose elements are the code points of patternText.
	// Else,
	// Let patternText be the result of interpreting each of P's 16-bit elements as a Unicode BMP code point. UTF-16 decoding is not applied to the elements.
	// Let patternCharacters be a List whose elements are the code unit elements of P.

	const patternText = P;

	// Let parseResult be ParsePattern(patternText, u).
	const parseResult = ParsePattern(patternText, u);

	// If parseResult is a non-empty List of SyntaxError objects, throw a SyntaxError exception.
	if (IsList(parseResult) && parseResult.some(item => item instanceof SyntaxError)) {
		throw new SyntaxError();
	}

	const objInternals = internals(obj as RegExp);

	// Set obj.[[OriginalSource]] to P.
	objInternals["[[OriginalSource]]"] = P;

	// Set obj.[[OriginalFlags]] to F.
	objInternals["[[OriginalFlags]]"] = F;

	// Set obj.[[RegExpMatcher]] to the Abstract Closure that evaluates parseResult by applying the semantics provided in 21.2.2 using patternCharacters as the pattern's List of SourceCharacter values and F as the flag parameters.
	objInternals["[[RegExpMatcher]]"] = (str, index) => (parseResult as ParseNode).program.exec(str, index) ?? failure;

	// Perform ? Set(obj, "lastIndex", 0, true).
	Set(obj, "lastIndex", 0, true);

	// Return obj.
	return obj as RegExp;
}
