import {Realm} from "../environment/realm/realm";

export function $RegExp$(realm: Realm) {
	return realm["[[GlobalObject]]"].RegExp;
}
