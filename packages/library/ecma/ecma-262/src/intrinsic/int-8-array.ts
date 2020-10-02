import {Realm} from "../environment/realm/realm";

export function $Int8Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Int8Array;
}
