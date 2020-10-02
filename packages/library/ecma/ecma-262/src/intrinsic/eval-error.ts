import {Realm} from "../environment/realm/realm";

export function $EvalError$(realm: Realm) {
	return realm["[[GlobalObject]]"].EvalError;
}
