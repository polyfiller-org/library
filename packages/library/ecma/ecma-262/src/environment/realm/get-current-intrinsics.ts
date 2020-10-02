import {Intrinsics} from "../../intrinsic/intrinsics";
import {getCurrentRealmRecord} from "./get-current-realm-record";

/**
 * Gets the current Realm Intrinsics
 * https://tc39.es/ecma262/#current-realm
 * @return {Intrinsics}
 */
export function getCurrentIntrinsics(): Intrinsics {
	return getCurrentRealmRecord()["[[Intrinsics]]"];
}
