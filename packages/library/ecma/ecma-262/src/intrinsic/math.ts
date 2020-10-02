import {Realm} from "../environment/realm/realm";

export function $Math$(realm: Realm) {
	return realm["[[GlobalObject]]"].Math;
}
