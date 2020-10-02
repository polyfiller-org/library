import {Realm} from "../environment/realm/realm";
import {pickMemberOfGlobalObjectFromRealm} from "./pick-member-of-global-object-from-realm";
import {getIsolatedGlobal} from "./isolated-global";

const NATIVE_ARRAY_BUFFER_PROTOTYPE =
	typeof ArrayBuffer !== "undefined" && ArrayBuffer.toString().indexOf("[native code]") >= 0
		? ArrayBuffer.prototype
		: typeof getIsolatedGlobal().ArrayBuffer !== "undefined"
		? getIsolatedGlobal().ArrayBuffer.prototype
		: undefined;

export function $ArrayBufferPrototype$(realm: Realm) {
	return pickMemberOfGlobalObjectFromRealm(NATIVE_ARRAY_BUFFER_PROTOTYPE, realm, "ArrayBuffer", "prototype");
}
