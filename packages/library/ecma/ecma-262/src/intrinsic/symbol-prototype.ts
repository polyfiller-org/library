import {Realm} from "../environment/realm/realm";

export function $SymbolPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Symbol.prototype;
}
