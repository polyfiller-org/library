import {Realm} from "@polyfiller/ecma-262";

export function $PluralRules$(realm: Realm) {
	return realm["[[GlobalObject]]"].Intl.PluralRules;
}
