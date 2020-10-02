import {Realm} from "../environment/realm/realm";

export function $SyntaxError$(realm: Realm) {
	return realm["[[GlobalObject]]"].SyntaxError;
}
