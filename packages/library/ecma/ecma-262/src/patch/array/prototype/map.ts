import {METHOD_DESCRIPTORS} from "../../descriptors";
import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {arrayPrototypeMap} from "../../../array/prototype/map";

export function patchArrayPrototypeMap(): void {
	// Array.prototype.map
	OrdinaryDefineOwnProperty(Array.prototype, "map", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": arrayPrototypeMap
	});
}
