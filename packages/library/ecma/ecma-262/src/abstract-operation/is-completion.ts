import {Type} from "./type";
import {Completion} from "../type/completion";

export function IsCompletion(x: unknown): x is Completion {
	// If Type(x) is not Object, return false.
	if (Type(x) !== "Object") return false;

	return "[[Value]]" in (x as object) && "[[Target]]" in (x as object) && "[[Type]]" in (x as object);
}
