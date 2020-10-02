import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_PROTOTYPE =
	typeof Array !== "undefined" && Array.toString().indexOf("[native code]") >= 0
		? Array.prototype
		: typeof getIsolatedGlobal().Array !== "undefined"
		? getIsolatedGlobal().Array.prototype
		: undefined;

export function $ArrayPrototype$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_PROTOTYPE, realm, "Array", "prototype");
}
