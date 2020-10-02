import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {symbolPrototypeDescription} from "../../../symbol/prototype/description";

export function patchSymbolPrototypeDescription (): void {

	// get Symbol.prototype.description
	OrdinaryDefineOwnProperty(Symbol.prototype, "description", {
		"[[Enumerable]]": false,
		"[[Configurable]]": true,
		"[[Get]]": symbolPrototypeDescription,
		"[[Set]]": undefined
	});
}