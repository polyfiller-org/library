import {Realm} from "../environment/realm/realm";

export function $Date$(realm: Realm) {
	return realm["[[GlobalObject]]"].Date;
}
