import {Realm} from "../environment/realm/realm";

export function $JSON$(realm: Realm) {
	return realm["[[GlobalObject]]"].JSON;
}
