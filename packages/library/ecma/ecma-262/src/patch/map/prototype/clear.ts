import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeClear} from "../../../map/prototype/clear";

export function patchMapPrototypeClear(): void {
	// Map.prototype.clear
	OrdinaryDefineOwnProperty(Map.prototype, "clear", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeClear
	});
}
