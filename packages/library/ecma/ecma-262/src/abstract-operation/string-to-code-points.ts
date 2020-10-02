import {List, makeList} from "../lib/list/list";
import {CodePointAt} from "./code-point-at";

/**
 * https://tc39.es/ecma262/#sec-stringtocodepoints
 */
export function StringToCodePoints(string: string): List<number> {
	// Let codePoints be a new empty List.
	const codePoints = makeList<number>();

	// Let size be the length of string.
	const size = string.length;

	// Let position be 0.
	let position = 0;

	// Repeat, while position < size,
	while (position < size) {
		// Let cp be ! CodePointAt(string, position).
		const cp = CodePointAt(string, position);

		// Append cp.[[CodePoint]] to codePoints.
		codePoints.append(cp["[[CodePoint]]"]);

		// Set position to position + cp.[[CodeUnitCount]].
		position = position + cp["[[CodeUnitCount]]"];
	}

	// Return codePoints.
	return codePoints;
}
