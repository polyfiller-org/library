import {Realm} from "./realm";
import {getCurrentRealmRecord} from "./get-current-realm-record";
import {internals} from "../../lib/internal-slot-map/internals";
import {getRealmFromGlobalThis} from "./get-realm-from-global-this";
import {FunctionInternals} from "../../internal-slot/function/function-internals";

/**
 * Attempts to resolve the realm from the given seed
 * @param {Function|null?} seed
 * @return {Function | undefined}
 */
export function getRealmRecordFromSeed(seed: any): Realm {
	const currentRealm = getCurrentRealmRecord();
	if (
		seed == null ||
		seed === Function ||
		seed === Object ||
		seed === Array ||
		seed === String ||
		seed === Number ||
		seed === Boolean ||
		seed === RegExp
	) {
		return currentRealm;
	}

	// If obj has a [[Realm]] internal slot, then use that
	const internalRealm = internals(seed as Function)["[[Realm]]"];
	if (internalRealm !== undefined) {
		return internalRealm;
	}

	if (seed.hasOwnProperty.__proto__ == null || (typeof globalThis !== "undefined" && seed === globalThis)) {
		return getCurrentRealmRecord();
	}

	const functionCtor = seed.hasOwnProperty.__proto__.constructor;
	if (functionCtor === Function || typeof functionCtor !== "function") {
		return getCurrentRealmRecord();
	}

	const globalObject = (functionCtor as FunctionConstructor)("return this")() as typeof globalThis;
	// Set the realm record on the seed
	const realm = getRealmFromGlobalThis(globalObject);
	const seedInternals = (internals(seed) as unknown) as FunctionInternals;
	seedInternals["[[Realm]]"] = realm;

	return realm;
}
