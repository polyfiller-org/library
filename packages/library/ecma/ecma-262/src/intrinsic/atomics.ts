import {Realm} from "../environment/realm/realm";

export function $Atomics$(realm: Realm) {
	return realm["[[GlobalObject]]"].Atomics;
}
