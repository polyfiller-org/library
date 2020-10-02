import {Realm} from "../environment/realm/realm";

export function $Promise_reject$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.reject;
}
