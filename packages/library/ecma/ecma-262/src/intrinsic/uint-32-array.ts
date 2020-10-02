import {Realm} from "../environment/realm/realm";

export function $Uint32Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Uint32Array;
}
