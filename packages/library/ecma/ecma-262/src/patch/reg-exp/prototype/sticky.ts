import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeSticky} from "../../../reg-exp/prototype/sticky";

export function patchRegExpPrototypeSticky(): void {
	// RegExp.prototype.sticky
	OrdinaryDefineOwnProperty(RegExp.prototype, "sticky", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeSticky
	});
}
