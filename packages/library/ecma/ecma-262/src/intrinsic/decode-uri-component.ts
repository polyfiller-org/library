import {Realm} from "../environment/realm/realm";

export function $decodeURIComponent$(realm: Realm) {
	return realm["[[GlobalObject]]"].decodeURIComponent;
}
