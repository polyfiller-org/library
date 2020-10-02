import {Realm} from "../environment/realm/realm";

export function $SyntaxErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].SyntaxError.prototype;
}
