import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_BUFFER =
	typeof ArrayBuffer !== "undefined" && ArrayBuffer.toString().indexOf("[native code]") >= 0 ? ArrayBuffer : getIsolatedGlobal().ArrayBuffer;

export function $ArrayBuffer$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_BUFFER, realm, "ArrayBuffer");
}
