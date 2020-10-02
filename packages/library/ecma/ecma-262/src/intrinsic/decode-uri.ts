import {Realm} from "../environment/realm/realm";

export function $decodeURI$(realm: Realm) {
	return realm["[[GlobalObject]]"].decodeURI;
}
