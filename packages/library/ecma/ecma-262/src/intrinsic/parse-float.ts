import {Realm} from "../environment/realm/realm";

export function $parseFloat$(realm: Realm) {
	return realm["[[GlobalObject]]"].parseFloat;
}
