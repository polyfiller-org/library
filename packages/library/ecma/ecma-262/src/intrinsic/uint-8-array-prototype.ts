import {Realm} from "../environment/realm/realm";

export function $Uint8ArrayPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Uint8Array.prototype;
}
