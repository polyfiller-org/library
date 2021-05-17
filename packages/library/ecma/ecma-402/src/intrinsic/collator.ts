import {Realm} from "@polyfiller/ecma-262";

export function $Collator$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.Collator;
}
