import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../../descriptors";
import {setPrototypeKeys} from "../../../set/prototype/keys";

export function patchSetPrototypeKeys(): void {
	// Set.prototype.keys
	OrdinaryDefineOwnProperty(Set.prototype, "keys", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": setPrototypeKeys
	});
}
