import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {setPrototypeSize} from "../../../set/prototype/size";

export function patchSetPrototypeSize(): void {
	// get Set.prototype.size
	OrdinaryDefineOwnProperty(Set.prototype, "size", {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": setPrototypeSize,
		"[[Set]]": undefined
	});
}
