import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY = typeof Array !== "undefined" && Array.toString().indexOf("[native code]") >= 0 ? Array : getIsolatedGlobal().Array;

export function $Array$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY, realm, "Array");
}
