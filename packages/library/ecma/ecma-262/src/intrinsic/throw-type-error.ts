import {Realm} from "../environment/realm/realm";

export function $ThrowTypeError$(realm: Realm) {
	return function() {
		throw new realm["[[GlobalObject]]"].TypeError();
	};
}
