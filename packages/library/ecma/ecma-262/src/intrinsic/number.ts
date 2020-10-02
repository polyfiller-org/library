import {Realm} from "../environment/realm/realm";

export function $Number$(realm: Realm) {
	return realm["[[GlobalObject]]"].Number;
}
