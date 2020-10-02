import {Realm} from "../environment/realm/realm";

export function $Promise_resolve$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.resolve;
}
