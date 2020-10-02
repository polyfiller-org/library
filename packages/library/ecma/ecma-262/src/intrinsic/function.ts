import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_FUNCTION = typeof Function !== "undefined" && Function.toString().indexOf("[native code]") >= 0 ? Function : getIsolatedGlobal().Function;

export function $Function$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_FUNCTION, realm, "Function");
}
