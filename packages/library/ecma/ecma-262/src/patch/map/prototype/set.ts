import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeSet} from "../../../map/prototype/set";

export function patchMapPrototypeSet(): void {
	// Map.prototype.set
	OrdinaryDefineOwnProperty(Map.prototype, "set", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeSet
	});
}
