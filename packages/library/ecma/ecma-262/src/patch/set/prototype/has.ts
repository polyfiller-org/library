import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeHas} from "../../../set/prototype/has";

export function patchSetPrototypeHas(): void {
	// Set.prototype.has
	OrdinaryDefineOwnProperty(Set.prototype, "has", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeHas
	});
}
