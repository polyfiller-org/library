import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_PROTO_VALUES =
	typeof Array !== "undefined" &&
	typeof Array.prototype !== "undefined" &&
	typeof Array.prototype.values !== "undefined" &&
	Array.prototype.values.toString().indexOf("[native code]") >= 0
		? Array.prototype.values
		: typeof getIsolatedGlobal().Array !== "undefined" && typeof getIsolatedGlobal().Array.prototype !== "undefined"
		? getIsolatedGlobal().Array.prototype.values
		: undefined;

export function $ArrayProto_values$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_PROTO_VALUES, realm, "Array", "prototype", "values");
}
