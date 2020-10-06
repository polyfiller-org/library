import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeDelete} from "../../../map/prototype/delete";

export function patchMapPrototypeDelete(): void {
	// Map.prototype.delete
	OrdinaryDefineOwnProperty(Map.prototype, "delete", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeDelete
	});
}
