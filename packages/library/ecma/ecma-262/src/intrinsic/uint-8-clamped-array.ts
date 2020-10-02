import {Realm} from "../environment/realm/realm";

export function $Uint8ClampedArray$(realm: Realm) {
	return realm["[[GlobalObject]]"].Uint8ClampedArray;
}
