import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectFreeze} from "../../object/freeze";

export function patchObjectFreeze(): void {
	// Object.freeze
	OrdinaryDefineOwnProperty(Object, "freeze", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectFreeze
	});
}
