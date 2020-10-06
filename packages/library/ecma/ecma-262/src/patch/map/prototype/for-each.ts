import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeForEach} from "../../../map/prototype/for-each";

export function patchMapPrototypeForEach(): void {
	// Map.prototype.forEach
	OrdinaryDefineOwnProperty(Map.prototype, "forEach", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeForEach
	});
}
