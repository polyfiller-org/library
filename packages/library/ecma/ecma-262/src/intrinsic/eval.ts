import {Realm} from "../environment/realm/realm";

export function $eval$(realm: Realm) {
	return realm["[[GlobalObject]]"].eval;
}
