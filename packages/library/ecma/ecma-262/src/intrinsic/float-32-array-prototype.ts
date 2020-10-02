import {Realm} from "../environment/realm/realm";

export function $Float32ArrayPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Float32Array.prototype;
}
