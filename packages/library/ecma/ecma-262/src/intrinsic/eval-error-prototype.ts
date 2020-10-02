import {Realm} from "../environment/realm/realm";

export function $EvalErrorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].EvalError.prototype;
}
