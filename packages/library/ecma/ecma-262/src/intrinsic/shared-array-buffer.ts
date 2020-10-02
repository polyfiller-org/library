import {Realm} from "../environment/realm/realm";

export function $SharedArrayBuffer$(realm: Realm) {
	return realm["[[GlobalObject]]"].SharedArrayBuffer;
}
