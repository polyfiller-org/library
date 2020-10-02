import {Realm} from "../environment/realm/realm";

export function $Int32Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Int32Array;
}
