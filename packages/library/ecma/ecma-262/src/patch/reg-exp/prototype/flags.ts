import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeFlags} from "../../../reg-exp/prototype/flags";

export function patchRegExpPrototypeFlags(): void {
	// RegExp.prototype.flags
	OrdinaryDefineOwnProperty(RegExp.prototype, "flags", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeFlags
	});
}
