import {Realm} from "../environment/realm/realm";

export function $WeakSet$(realm: Realm) {
	return realm["[[GlobalObject]]"].WeakSet;
}
