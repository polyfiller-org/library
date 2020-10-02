import {Realm} from "../environment/realm/realm";

export function $ReferenceError$(realm: Realm) {
	return realm["[[GlobalObject]]"].ReferenceError;
}
