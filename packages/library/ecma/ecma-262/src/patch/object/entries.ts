import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {objectEntries} from "../../object/entries";

export function patchObjectEntries(): void {
	// Object.entries
	OrdinaryDefineOwnProperty(Object, "entries", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": objectEntries
	});
}
