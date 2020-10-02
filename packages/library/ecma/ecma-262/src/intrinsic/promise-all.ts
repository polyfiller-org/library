import {Realm} from "../environment/realm/realm";

export function $Promise_all$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.all;
}
