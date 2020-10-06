import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeIgnoreCase} from "../../../reg-exp/prototype/ignore-case";

export function patchRegExpPrototypeIgnoreCase(): void {
	// RegExp.prototype.ignoreCase
	OrdinaryDefineOwnProperty(RegExp.prototype, "ignoreCase", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeIgnoreCase
	});
}
