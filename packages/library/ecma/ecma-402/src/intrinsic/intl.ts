import {Realm} from "@polyfiller/ecma-262";

export function $Intl$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl;
}
