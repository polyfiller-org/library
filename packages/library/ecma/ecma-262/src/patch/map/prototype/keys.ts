import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {mapPrototypeKeys} from "../../../map/prototype/keys";

export function patchMapPrototypeKeys(): void {
	// Map.prototype.keys
	OrdinaryDefineOwnProperty(Map.prototype, "keys", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": mapPrototypeKeys
	});
}
