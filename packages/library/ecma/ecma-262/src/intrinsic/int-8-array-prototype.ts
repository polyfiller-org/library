import {Realm} from "../environment/realm/realm";

export function $Int8ArrayPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Int8Array.prototype;
}
