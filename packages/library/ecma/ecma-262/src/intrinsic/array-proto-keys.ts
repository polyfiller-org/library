import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_PROTO_KEYS =
	typeof Array !== "undefined" &&
	typeof Array.prototype !== "undefined" &&
	typeof Array.prototype.keys !== "undefined" &&
	Array.prototype.keys.toString().indexOf("[native code]") >= 0
		? Array.prototype.keys
		: typeof getIsolatedGlobal().Array !== "undefined" && typeof getIsolatedGlobal().Array.prototype !== "undefined"
		? getIsolatedGlobal().Array.prototype.keys
		: undefined;

export function $ArrayProto_keys$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_PROTO_KEYS, realm, "Array", "prototype", "keys");
}
