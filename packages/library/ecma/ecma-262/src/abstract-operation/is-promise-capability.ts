import {Type} from "./type";
import {PromiseCapability} from "../type/promise-capability";

/**
 * @param {*} x
 * @return {item is PromiseCapability}
 */
export function IsPromiseCapability(x: unknown): x is PromiseCapability {
	// If Type(x) is not Object, return false.
	if (Type(x) !== "Object") return false;

	return "[[Promise]]" in (x as object) && "[[Resolve]]" in (x as object) && "[[Reject]]" in (x as object);
}
