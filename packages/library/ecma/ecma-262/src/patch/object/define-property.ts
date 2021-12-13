import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectDefineProperty} from "../../object/define-property";

export function patchObjectDefineProperty(): void {
	// Object.defineProperty
	OrdinaryDefineOwnProperty(Object, "defineProperty", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectDefineProperty
	});
}
