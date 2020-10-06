import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeHas} from "../../../map/prototype/has";

export function patchMapPrototypeHas(): void {
	// Map.prototype.has
	OrdinaryDefineOwnProperty(Map.prototype, "has", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeHas
	});
}
