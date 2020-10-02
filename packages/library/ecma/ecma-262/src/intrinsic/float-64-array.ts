import {Realm} from "../environment/realm/realm";

export function $Float64Array$(realm: Realm) {
	return realm["[[GlobalObject]]"].Float64Array;
}
