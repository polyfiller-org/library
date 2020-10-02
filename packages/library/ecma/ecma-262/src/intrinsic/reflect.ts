import {Realm} from "../environment/realm/realm";

export function $Reflect$(realm: Realm) {
	return realm["[[GlobalObject]]"].Reflect;
}
