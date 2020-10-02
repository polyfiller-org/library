import {Realm} from "../environment/realm/realm";

export function $RangeError$(realm: Realm) {
	return realm["[[GlobalObject]]"].RangeError;
}
