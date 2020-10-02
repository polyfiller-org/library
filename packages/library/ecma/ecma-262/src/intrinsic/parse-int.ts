import {Realm} from "../environment/realm/realm";

export function $parseInt$(realm: Realm) {
	return realm["[[GlobalObject]]"].parseInt;
}
