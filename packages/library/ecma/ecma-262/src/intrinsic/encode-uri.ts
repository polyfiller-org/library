import {Realm} from "../environment/realm/realm";

export function $encodeURI$(realm: Realm) {
	return realm["[[GlobalObject]]"].encodeURI;
}
