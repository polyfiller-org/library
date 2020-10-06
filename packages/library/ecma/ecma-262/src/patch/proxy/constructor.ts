import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {ProxyConstructor} from "../../proxy/proxy";
import {GlobalThisValue} from "../../environment/global-this-value";

export function patchProxyConstructor(): void {

// Proxy constructor
	OrdinaryDefineOwnProperty(GlobalThisValue(), "Proxy", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": ProxyConstructor
	});
}
