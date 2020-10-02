import {Realm} from "../environment/realm/realm";

export function $Uint8Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Uint8Array;
}
