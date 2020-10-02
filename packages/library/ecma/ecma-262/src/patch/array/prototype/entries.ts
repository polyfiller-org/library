import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeEntries} from "../../../array/prototype/entries";

export function patchArrayPrototypeEntries(): void {
	// Array.prototype.entries
	OrdinaryDefineOwnProperty(Array.prototype, "entries", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeEntries
	});
}
