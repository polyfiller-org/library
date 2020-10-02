import {Realm} from "../environment/realm/realm";

export function $WeakMap$(realm: Realm) {
	return realm["[[GlobalObject]]"].WeakMap;
}
