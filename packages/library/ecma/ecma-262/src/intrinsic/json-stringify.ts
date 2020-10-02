import {Realm} from "../environment/realm/realm";

export function $JSONStringify$(realm: Realm) {
	return realm["[[GlobalObject]]"].JSON.stringify;
}
