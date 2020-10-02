import {List, makeList} from "../lib/list/list";
import {Compiler, Parser, Pattern, Program} from "../parser/regexp";

export interface ParseNode {
	pattern: Pattern;
	program: Program;
}

/**
 * https://tc39.es/ecma262/#sec-parsepattern
 */
export function ParsePattern(patternText: string, u: boolean): ParseNode | List<SyntaxError> {
	let pattern: Pattern | SyntaxError;

	// If u is true, then
	if (u === true) {
		try {
			// Parse patternText using the grammars in 21.2.1. The goal symbol for the parse is Pattern[+U, +N].
			pattern = new Parser(patternText, "u").parse();
		} catch (ex) {
			pattern = new SyntaxError(ex.message);
		}
	}

	// Else,
	else {
		try {
			// Parse patternText using the grammars in 21.2.1. The goal symbol for the parse is Pattern[~U, ~N]. If the result of parsing contains a GroupName, reparse with the goal symbol Pattern[~U, +N] and use this result instead.
			pattern = new Parser(patternText).parse();
		} catch (ex) {
			pattern = new SyntaxError(ex.message);
		}
	}

	// If patternText did not conform to the grammar, or any elements of patternText were not matched by the parse, or any Early Error conditions exist, return a List of one or more SyntaxError objects representing the parsing errors and/or early errors.
	if (pattern instanceof SyntaxError) {
		return makeList(pattern);
	}

	// Otherwise, return the Parse Node resulting from the parse.
	return {
		pattern,
		program: new Compiler(pattern).compile()
	};
}
