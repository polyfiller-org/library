import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_FUNCTION_PROTOTYPE =
	typeof Function !== "undefined" && Function.toString().indexOf("[native code]") >= 0
		? Function.prototype
		: typeof getIsolatedGlobal().Function !== "undefined"
		? getIsolatedGlobal().Function.prototype
		: undefined;

export function $FunctionPrototype$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_FUNCTION_PROTOTYPE, realm, "Function", "prototype");
}
