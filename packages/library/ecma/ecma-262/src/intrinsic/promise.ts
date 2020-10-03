import {Realm} from "../environment/realm/realm";

// eslint-disable-next-line @typescript-eslint/promise-function-async
export function $PromisePrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Promise.prototype;
}
