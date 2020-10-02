import {Realm} from "../environment/realm/realm";

export function $Symbol$(realm: Realm) {
	return realm["[[GlobalObject]]"].Symbol;
}
