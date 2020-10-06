import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectSetPrototypeOf} from "../../object/set-prototype-of";

export function patchObjectSetPrototypeOf(): void {
	// Object.setPrototypeOf
	OrdinaryDefineOwnProperty(Object, "setPrototypeOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectSetPrototypeOf
	});
}
