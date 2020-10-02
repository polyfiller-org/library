import {Realm} from "../environment/realm/realm";

export function $DataView$(realm: Realm) {
	return realm["[[GlobalObject]]"].DataView;
}
