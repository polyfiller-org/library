import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeEntries} from "../../../map/prototype/entries";

export function patchMapPrototypeEntries(): void {
	// Map.prototype.entries
	OrdinaryDefineOwnProperty(Map.prototype, "entries", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeEntries
	});
}
