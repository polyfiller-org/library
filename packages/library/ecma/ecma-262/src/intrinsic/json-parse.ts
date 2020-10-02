import {Realm} from "../environment/realm/realm";

export function $JSONParse$(realm: Realm) {
	return realm["[[GlobalObject]]"].JSON.parse;
}
