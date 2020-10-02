import {Realm} from "../environment/realm/realm";

export function $Boolean$(realm: Realm) {
	return realm["[[GlobalObject]]"].Boolean;
}
