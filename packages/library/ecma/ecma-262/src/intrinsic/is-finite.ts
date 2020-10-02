import {Realm} from "../environment/realm/realm";

export function $isFinite$(realm: Realm) {
	return realm["[[GlobalObject]]"].isFinite;
}
