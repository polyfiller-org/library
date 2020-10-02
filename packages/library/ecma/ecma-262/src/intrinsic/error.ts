import {Realm} from "../environment/realm/realm";

export function $Error$(realm: Realm) {
	return realm["[[GlobalObject]]"].Error;
}
