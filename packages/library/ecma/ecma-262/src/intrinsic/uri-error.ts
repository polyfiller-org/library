import {Realm} from "../environment/realm/realm";

export function $URIError$(realm: Realm) {
	return realm["[[GlobalObject]]"].URIError;
}
