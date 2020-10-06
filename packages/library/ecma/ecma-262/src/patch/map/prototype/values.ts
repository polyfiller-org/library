import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeValues} from "../../../map/prototype/values";

export function patchMapPrototypeValues(): void {
	// Map.prototype.values
	OrdinaryDefineOwnProperty(Map.prototype, "values", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeValues
	});
}
