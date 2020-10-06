import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeDelete} from "../../../set/prototype/delete";

export function patchSetPrototypeDelete(): void {
	// Set.prototype.delete
	OrdinaryDefineOwnProperty(Set.prototype, "delete", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeDelete
	});
}
