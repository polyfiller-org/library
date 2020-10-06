import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {mapPrototypeSize} from "../../../map/prototype/size";

export function patchMapPrototypeSize(): void {
	// get Map.prototype.size
	OrdinaryDefineOwnProperty(Map.prototype, "size", {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": mapPrototypeSize,
		"[[Set]]": undefined
	});
}
