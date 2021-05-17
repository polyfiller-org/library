import {Realm} from "@polyfiller/ecma-262";

export function $Date_now$(realm: Realm) {
	return realm["[[GlobalObject]]"].Date.now;
}
