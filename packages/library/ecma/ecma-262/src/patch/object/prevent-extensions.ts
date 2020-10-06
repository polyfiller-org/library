import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectPreventExtensions} from "../../object/prevent-extensions";

export function patchObjectPreventExtensions(): void {
	// Object.preventExtensions
	OrdinaryDefineOwnProperty(Object, "preventExtensions", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectPreventExtensions
	});
}
