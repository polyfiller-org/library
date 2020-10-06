import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeClear} from "../../../set/prototype/clear";

export function patchSetPrototypeClear(): void {
	// Set.prototype.clear
	OrdinaryDefineOwnProperty(Set.prototype, "clear", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeClear
	});
}
