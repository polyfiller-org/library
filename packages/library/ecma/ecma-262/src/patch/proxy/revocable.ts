import {OrdinaryDefineOwnProperty} from "../../abstract-operation/ordinary-define-own-property";
import {METHOD_DESCRIPTORS} from "../descriptors";
import {proxyRevocable} from "../../proxy/revocable";

export function patchProxyRevocable(): void {
	// Proxy.revocable
	OrdinaryDefineOwnProperty(Proxy, "revocable", {
		...METHOD_DESCRIPTORS,
		"[[Value]]": proxyRevocable
	});
}
