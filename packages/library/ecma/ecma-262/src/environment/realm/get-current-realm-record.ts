import {GlobalThisValue} from "../global-this-value";
import {Realm} from "./realm";
import {getRealmFromGlobalThis} from "./get-realm-from-global-this";

/**
 * Gets the current Realm record
 * https://tc39.es/ecma262/#current-realm
 * @return
 */
export function getCurrentRealmRecord(): Realm {
	return getRealmFromGlobalThis(GlobalThisValue());
}
