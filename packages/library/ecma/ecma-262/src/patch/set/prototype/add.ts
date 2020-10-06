import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeAdd} from "../../../set/prototype/add";

export function patchSetPrototypeAdd(): void {
	// Set.prototype.add
	OrdinaryDefineOwnProperty(Set.prototype, "add", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeAdd
	});
}
