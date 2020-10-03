import {Type} from "./type";
import {CompletionAbrupt} from "../type/completion";

export function IsAbruptCompletion(x: unknown): x is CompletionAbrupt {
	// If Type(x) is not Object, return false.
	if (Type(x) !== "Object") return false;

	return (
		"[[Value]]" in (x as object) &&
		"[[Target]]" in (x as object) &&
		"[[Type]]" in (x as object) &&
		((x as CompletionAbrupt)["[[Type]]"] === "break" ||
			(x as CompletionAbrupt)["[[Type]]"] === "continue" ||
			(x as CompletionAbrupt)["[[Type]]"] === "return" ||
			(x as CompletionAbrupt)["[[Type]]"] === "throw")
	);
}
