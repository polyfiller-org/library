import {Realm} from "../environment/realm/realm";

export function $Int16Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Int16Array;
}
