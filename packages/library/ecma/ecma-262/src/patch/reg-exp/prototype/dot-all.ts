import {OrdinaryDefineOwnProperty} from "../../../abstract-operation/ordinary-define-own-property";
import {GETTER_DESCRIPTORS} from "../../descriptors";
import {regExpPrototypeDotAll} from "../../../reg-exp/prototype/dot-all";

export function patchRegExpPrototypeDotAll(): void {
	// RegExp.prototype.dotAll
	OrdinaryDefineOwnProperty(RegExp.prototype, "dotAll", {
		...GETTER_DESCRIPTORS,
		"[[Get]]": regExpPrototypeDotAll
	});
}
