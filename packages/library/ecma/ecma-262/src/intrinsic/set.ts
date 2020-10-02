import {Realm} from "../environment/realm/realm";

export function $Set$(realm: Realm) {
	return realm["[[GlobalObject]]"].Set;
}
