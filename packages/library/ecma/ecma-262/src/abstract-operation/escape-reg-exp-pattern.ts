/**
 * https://tc39.es/ecma262/#sec-escaperegexppattern
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EscapeRegExpPattern(P: string, _F: string): string {
	// Let S be a String in the form of a Pattern[~U] (Pattern[+U] if F contains "u") equivalent to P
	// interpreted as UTF-16 encoded Unicode code points (6.1.4), in which certain code points are
	// escaped as described below. S may or may not be identical to P; however, the Abstract Closure
	// that would result from evaluating S as a Pattern[~U] (Pattern[+U] if F contains "u") must behave
	// identically to the Abstract Closure given by the constructed object's [[RegExpMatcher]] internal slot.
	// Multiple calls to this abstract operation using the same values for P and F must produce identical results.

	// The code points / or any LineTerminator occurring in the pattern shall be escaped in S as necessary to ensure
	// that the string-concatenation of "/", S, "/", and F can be parsed (in an appropriate lexical context) as a RegularExpressionLiteral
	// that behaves identically to the constructed regular expression. For example, if P is "/", then S could be "\/" or "\u002F", among other
	// possibilities, but not "/", because /// followed by F would be parsed as a SingleLineComment rather than a RegularExpressionLiteral.
	// If P is the empty String, this specification can be met by letting S be "(?:)".
	let S: string;
	if (P === "") {
		S = "(?:)";
	} else {
		S = "";
		let offset = 0;
		const getCurrent = () => P[offset];
		const peek = (peekOffset = 1) => P[offset + peekOffset];

		while (offset < P.length) {
			switch (getCurrent()) {
				case "/":
					S += "\\/";
					offset++;
					break;

				case "\\": {
					S += peek(1) == null ? getCurrent() : `${getCurrent()}${peek(1)}`;
					offset++;
					offset++;
					break;
				}

				default: {
					S += getCurrent();
					offset++;
					break;
				}
			}
		}
	}

	// Return S.
	return S;
}
