import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectIsExtensible} from "../../object/is-extensible";

export function patchObjectIsExtensible(): void {
	// Object.isExtensible
	OrdinaryDefineOwnProperty(Object, "isExtensible", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectIsExtensible
	});
}
