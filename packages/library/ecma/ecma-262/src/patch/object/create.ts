import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectCreate} from "../../object/create";

export function patchObjectCreate(): void {
	// Object.create
	OrdinaryDefineOwnProperty(Object, "create", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectCreate
	});
}
