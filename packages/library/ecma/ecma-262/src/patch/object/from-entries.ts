import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectFromEntries} from "../../object/from-entries";

export function patchObjectFromEntries(): void {
	// Object.fromEntries
	OrdinaryDefineOwnProperty(Object, "fromEntries", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectFromEntries
	});
}
