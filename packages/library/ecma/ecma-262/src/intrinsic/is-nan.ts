import {Realm} from "../environment/realm/realm";

export function $isNaN$(realm: Realm) {
	return realm["[[GlobalObject]]"].isNaN;
}
