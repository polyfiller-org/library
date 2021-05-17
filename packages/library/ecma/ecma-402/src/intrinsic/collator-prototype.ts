import {Realm} from "@polyfiller/ecma-262";

export function $CollatorPrototype$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.Collator.prototype;
}
