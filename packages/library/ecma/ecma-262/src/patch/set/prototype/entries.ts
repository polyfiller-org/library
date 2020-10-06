import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeEntries} from "../../../set/prototype/entries";

export function patchSetPrototypeEntries(): void {
	// Set.prototype.entries
	OrdinaryDefineOwnProperty(Set.prototype, "entries", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeEntries
	});
}
