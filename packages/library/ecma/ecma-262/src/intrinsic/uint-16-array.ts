import {Realm} from "../environment/realm/realm";

export function $Uint16Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Uint16Array;
}
