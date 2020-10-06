import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectKeys} from "../../object/keys";

export function patchObjectKeys(): void {
	// Object.keys
	OrdinaryDefineOwnProperty(Object, "keys", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectKeys
	});
}
