import {Realm} from "../environment/realm/realm";

export function $Float32Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Float32Array;
}
