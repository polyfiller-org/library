import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_PROTO_FOR_EACH =
	typeof Array !== "undefined" &&
	typeof Array.prototype !== "undefined" &&
	typeof Array.prototype.forEach !== "undefined" &&
	Array.prototype.forEach.toString().indexOf("[native code]") >= 0
		? Array.prototype.forEach
		: typeof getIsolatedGlobal().Array !== "undefined" && typeof getIsolatedGlobal().Array.prototype !== "undefined"
		? getIsolatedGlobal().Array.prototype.forEach
		: undefined;

export function $ArrayProto_forEach$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_PROTO_FOR_EACH, realm, "Array", "prototype", "forEach");
}
