import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectSeal} from "../../object/seal";

export function patchObjectSeal(): void {
	// Object.seal
	OrdinaryDefineOwnProperty(Object, "seal", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectSeal
	});
}
