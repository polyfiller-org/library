import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeGlobal} from "../../../reg-exp/prototype/global";

export function patchRegExpPrototypeGlobal(): void {
	// RegExp.prototype.global
	OrdinaryDefineOwnProperty(RegExp.prototype, "global", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeGlobal
	});
}
