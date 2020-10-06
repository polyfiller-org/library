import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectGetPrototypeOf} from "../../object/get-prototype-of";

export function patchObjectGetPrototypeOf(): void {
	// Object.getPrototypeOf
	OrdinaryDefineOwnProperty(Object, "getPrototypeOf", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectGetPrototypeOf
	});
}
