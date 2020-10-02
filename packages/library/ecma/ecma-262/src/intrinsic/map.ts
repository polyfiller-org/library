import {Realm} from "../environment/realm/realm";

export function $Map$(realm: Realm) {
	return realm["[[GlobalObject]]"].Map;
}
