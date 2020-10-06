import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectIsFrozen} from "../../object/is-frozen";

export function patchObjectIsFrozen(): void {
	// Object.isFrozen
	OrdinaryDefineOwnProperty(Object, "isFrozen", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectIsFrozen
	});
}
