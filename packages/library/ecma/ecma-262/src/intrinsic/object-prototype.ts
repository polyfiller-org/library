import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_OBJECT_PROTOTYPE =
	typeof Object !== "undefined" && Object.toString().indexOf("[native code]") >= 0
		? Object.prototype
		: typeof getIsolatedGlobal().Object !== "undefined"
		? getIsolatedGlobal().Object.prototype
		: undefined;

export function $ObjectPrototype$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_OBJECT_PROTOTYPE, realm, "Object", "prototype");
}
