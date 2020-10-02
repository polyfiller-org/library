import {Realm} from "../environment/realm/realm";

export function $Proxy$(realm: Realm) {
	return realm["[[GlobalObject]]"].Proxy;
}
