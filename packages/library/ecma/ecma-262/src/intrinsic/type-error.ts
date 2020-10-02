import {Realm} from "../environment/realm/realm";

export function $TypeError$(realm: Realm) {
	return realm["[[GlobalObject]]"].TypeError;
}
