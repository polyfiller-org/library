import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_OBJECT = typeof Object !== "undefined" && Object.toString().indexOf("[native code]") >= 0 ? Object : getIsolatedGlobal().Object;

export function $Object$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_OBJECT, realm, "Object");
}
