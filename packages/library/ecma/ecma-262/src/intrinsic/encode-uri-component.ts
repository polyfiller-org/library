import {Realm} from "../environment/realm/realm";

export function $encodeURIComponent$(realm: Realm) {
	return realm["[[GlobalObject]]"].encodeURIComponent;
}
