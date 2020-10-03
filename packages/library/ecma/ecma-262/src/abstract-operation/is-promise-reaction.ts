import {Type} from "./type";
import {PromiseReaction} from "../type/promise-reaction";

export function IsPromiseReaction(x: unknown): x is PromiseReaction {
	// If Type(x) is not Object, return false.
	if (Type(x) !== "Object") return false;

	return "[[Capability]]" in (x as object) && "[[Type]]" in (x as object) && "[[Handler]]" in (x as object);
}
