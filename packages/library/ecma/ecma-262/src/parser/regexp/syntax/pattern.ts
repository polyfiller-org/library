/** Type for whole regular expression pattern. */
export interface Pattern {
	type: "Pattern";
	flagSet: FlagSet;
	captureParens: number;
	names: Map<string, number>;
	child: Node;
	range: [number, number];
}

/** Types for regular expression flags. */
export interface FlagSet {
	global: boolean;
	ignoreCase: boolean;
	multiline: boolean;
	dotAll: boolean;
	unicode: boolean;
	sticky: boolean;
}

/** Type for part of regular expression pattern. */
export type Node =
	| Disjunction
	| Sequence
	| Capture
	| NamedCapture
	| Group
	| Many
	| Some
	| Optional
	| Repeat
	| WordBoundary
	| LineBegin
	| LineEnd
	| LookAhead
	| LookBehind
	| Char
	| EscapeClass
	| Class
	| Dot
	| BackRef
	| NamedBackRef;

/** Type for items of character class. */
export type ClassItem = Char | EscapeClass | ClassRange;

/** Type for AST elements. */
export type Element = Pattern | Node | ClassItem;

/** Type for select pattern `/(a|b)/`. */
export interface Disjunction {
	type: "Disjunction";
	children: Node[];
	range: [number, number];
}

/** Type for sequence pattern `/(ab)/`. */
export interface Sequence {
	type: "Sequence";
	children: Node[];
	range: [number, number];
}

/** Type for capture group `/(...)/`. */
export interface Capture {
	type: "Capture";
	index: number;
	child: Node;
	range: [number, number];
}

/** Type for named capture group `/(?<x>...)/`. */
export interface NamedCapture {
	type: "NamedCapture";
	name: string;
	raw: string;
	child: Node;
	range: [number, number];
}

/** Type for non-capture group `/(?:...)/`. */
export interface Group {
	type: "Group";
	child: Node;
	range: [number, number];
}

/** Type for zero-or-more repetition pattern `/(a*)/`. */
export interface Many {
	type: "Many";
	nonGreedy: boolean;
	child: Node;
	range: [number, number];
}

/** Type for one-or-more repetition pattern `/(a+)/`. */
export interface Some {
	type: "Some";
	nonGreedy: boolean;
	child: Node;
	range: [number, number];
}

/** Type for skippable pattern `/(a?)/`. */
export interface Optional {
	type: "Optional";
	nonGreedy: boolean;
	child: Node;
	range: [number, number];
}

/** Type for general repetition pattern `/(a{10,20})/`. */
export interface Repeat {
	type: "Repeat";
	min: number;
	max: number | null;
	nonGreedy: boolean;
	child: Node;
	range: [number, number];
}

/** Type for word boundary assertion pattern `/(\b)/`. */
export interface WordBoundary {
	type: "WordBoundary";
	invert: boolean;
	range: [number, number];
}

/** Type for line begin assertion pattern `/(^)/`. */
export interface LineBegin {
	type: "LineBegin";
	range: [number, number];
}

/** Type for line end assertion pattern `/($)/`. */
export interface LineEnd {
	type: "LineEnd";
	range: [number, number];
}

/** Type for look-ahead assertion `/(?=a)/`. */
export interface LookAhead {
	type: "LookAhead";
	negative: boolean;
	child: Node;
	range: [number, number];
}

/** Type for look-behind assertion `/(?<=a)/`. */
export interface LookBehind {
	type: "LookBehind";
	negative: boolean;
	child: Node;
	range: [number, number];
}

/** Type for character pattern `/a/`. */
export interface Char {
	type: "Char";
	value: number;
	raw: string;
	range: [number, number];
}

/** Type for escape sequence class like `/\w/`. */
export type EscapeClass = SimpleEscapeClass | UnicodePropertyEscapeClass | UnicodePropertyValueEscapeClass;

/** Type for simple escape sequence class like `/\d/`. */
export interface SimpleEscapeClass {
	type: "EscapeClass";
	kind: "digit" | "word" | "space";
	invert: boolean;
	range: [number, number];
}

/** Type for unicode property escape sequence class like `\p{Zs}`. */
export interface UnicodePropertyEscapeClass {
	type: "EscapeClass";
	kind: "unicode_property";
	invert: boolean;
	property: string;
	range: [number, number];
}

/** Type for unicode property value escape sequence class like `\p{Script=Hira}`. */
export interface UnicodePropertyValueEscapeClass {
	type: "EscapeClass";
	kind: "unicode_property_value";
	invert: boolean;
	property: string;
	value: string;
	range: [number, number];
}

/** Type for character class pattern `/[a-z]/`. */
export interface Class {
	type: "Class";
	invert: boolean;
	children: ClassItem[];
	range: [number, number];
}

/** Type for character range in class pattern. */
export interface ClassRange {
	type: "ClassRange";
	children: [Char, Char];
	range: [number, number];
}

/** Type for any character pattern `/./`. */
export interface Dot {
	type: "Dot";
	range: [number, number];
}

/** Type for back reference pattern `/\1/`. */
export interface BackRef {
	type: "BackRef";
	index: number;
	range: [number, number];
}

/** Type for named back reference pattern `/\k<x>/`. */
export interface NamedBackRef {
	type: "NamedBackRef";
	name: string;
	raw: string;
	range: [number, number];
}

/**
 * Escapes raw character for showing.
 *
 * See https://www.ecma-international.org/ecma-262/10.0/index.html#sec-escaperegexppattern.
 */
const escapeRaw = (raw: string): string => {
	switch (raw) {
		case "\n":
			return "\\n";
		case "\r":
			return "\\r";
		case "\u2028":
			return "\\u2028";
		case "\u2029":
			return "\\u2029";
	}
	return raw;
};

/** Show class item as string. */
const classItemToString = (n: ClassItem): string => {
	switch (n.type) {
		case "Char":
			return escapeRaw(n.raw);
		case "EscapeClass":
			switch (n.kind) {
				case "digit":
					return n.invert ? "\\D" : "\\d";
				case "word":
					return n.invert ? "\\W" : "\\w";
				case "space":
					return n.invert ? "\\S" : "\\s";
				case "unicode_property":
					return `\\${n.invert ? "P" : "p"}{${n.property}}`;
				case "unicode_property_value":
					return `\\${n.invert ? "P" : "p"}{${n.property}=${n.value}}`;
			}
		// The above `switch-case` is exhaustive and it is checked by `tsc`, so `eslint` rule is disabled.
		// eslint-disable-next-line no-fallthrough
		case "ClassRange":
			return `${escapeRaw(n.children[0].raw)}-${escapeRaw(n.children[1].raw)}`;
	}
};

/** Show node as string. */
export const nodeToString = (n: Node): string => {
	switch (n.type) {
		case "Sequence":
			return n.children.map(nodeToString).join("");
		case "Disjunction":
			return n.children.map(nodeToString).join("|");
		case "Capture":
			return `(${nodeToString(n.child)})`;
		case "NamedCapture":
			return `(?<${n.raw}>${nodeToString(n.child)})`;
		case "Group":
			return `(?:${nodeToString(n.child)})`;
		case "Many":
			return `${nodeToString(n.child)}*${n.nonGreedy ? "?" : ""}`;
		case "Some":
			return `${nodeToString(n.child)}+${n.nonGreedy ? "?" : ""}`;
		case "Optional":
			return `${nodeToString(n.child)}?${n.nonGreedy ? "?" : ""}`;
		case "Repeat": {
			let s = nodeToString(n.child);
			s += `{${n.min}`;
			if (n.max === Infinity) {
				s += ",";
			} else if ((n.max ?? n.min) !== n.min) {
				s += `,${n.max}`;
			}
			s += "}" + (n.nonGreedy ? "?" : "");
			return s;
		}
		case "WordBoundary":
			return n.invert ? "\\B" : "\\b";
		case "LineBegin":
			return "^";
		case "LineEnd":
			return "$";
		case "LookAhead":
			return `(?${n.negative ? "!" : "="}${nodeToString(n.child)})`;
		case "LookBehind":
			return `(?<${n.negative ? "!" : "="}${nodeToString(n.child)})`;
		case "Char": {
			const c = escapeRaw(n.raw);
			return c === "/" ? "\\/" : c;
		}
		case "EscapeClass":
			return classItemToString(n);
		case "Class":
			return `[${n.invert ? "^" : ""}${n.children.map(classItemToString).join("")}]`;
		case "Dot":
			return ".";
		case "BackRef":
			return `\\${n.index}`;
		case "NamedBackRef":
			return `\\k<${n.raw}>`;
	}
};

/** Show flag set as string. */
export const flagSetToString = (set: FlagSet): string => {
	let s = "";
	if (set.global) {
		s += "g";
	}
	if (set.ignoreCase) {
		s += "i";
	}
	if (set.multiline) {
		s += "m";
	}
	if (set.dotAll) {
		s += "s";
	}
	if (set.unicode) {
		s += "u";
	}
	if (set.sticky) {
		s += "y";
	}
	return s;
};

/** Show pattern as string. */
export const patternToString = (p: Pattern): string => {
	let s = "/";
	const n = nodeToString(p.child);
	s += n === "" ? "(?:)" : n;
	s += "/";
	s += flagSetToString(p.flagSet);
	return s;
};
