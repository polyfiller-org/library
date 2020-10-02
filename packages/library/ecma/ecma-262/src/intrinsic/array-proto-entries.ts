import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_PROTO_ENTRIES =
	typeof Array !== "undefined" &&
	typeof Array.prototype !== "undefined" &&
	typeof Array.prototype.entries !== "undefined" &&
	Array.prototype.entries.toString().indexOf("[native code]") >= 0
		? Array.prototype.entries
		: typeof getIsolatedGlobal().Array !== "undefined" && typeof getIsolatedGlobal().Array.prototype !== "undefined"
		? getIsolatedGlobal().Array.prototype.entries
		: undefined;

export function $ArrayProto_entries$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_PROTO_ENTRIES, realm, "Array", "prototype", "entries");
}
