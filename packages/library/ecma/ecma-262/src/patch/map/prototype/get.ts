import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeGet} from "../../../map/prototype/get";

export function patchMapPrototypeGet(): void {
	// Map.prototype.get
	OrdinaryDefineOwnProperty(Map.prototype, "get", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeGet
	});
}
