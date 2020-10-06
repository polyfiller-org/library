import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectIsSealed} from "../../object/is-sealed";

export function patchObjectIsSealed(): void {
	// Object.isSealed
	OrdinaryDefineOwnProperty(Object, "isSealed", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectIsSealed
	});
}
