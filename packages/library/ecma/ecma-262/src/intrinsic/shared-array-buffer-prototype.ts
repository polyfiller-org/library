import {Realm} from "../environment/realm/realm";

export function $SharedArrayBufferPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].SharedArrayBuffer.prototype;
}
