import {Realm} from "../environment/realm/realm";

export function $Promise$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise;
}
