import {Realm} from "./realm";
import {Intrinsics} from "../../intrinsic/intrinsics";
import {CreateIntrinsics, ExtendIntrinsics} from "../../abstract-operation/create-intrinsics";
import {makeList} from "../../lib/list/list";
import {MapLike} from "../../lib/map-like/map-like";

const realms = new MapLike<typeof globalThis, Realm>();
const realmsWithExtendedIntrinsics = makeList<Realm>();
let extendedIntrinsics: ((realm: Realm) => Record<string, unknown>) | undefined;

export function extendIntrinsics<T extends Record<string, unknown>>(intrinsics: (realm: Realm) => T): void {
	extendedIntrinsics = intrinsics;
}

export function getRealmFromGlobalThis<TIntrinsics extends Intrinsics = Intrinsics>(_globalThis: typeof globalThis): Realm<TIntrinsics> {
	if (realms.has(_globalThis)) {
		const realm = realms.get(_globalThis)!;

		// We might need to lazily extend the intrinsics sometime in the future
		if (extendedIntrinsics != null && !realmsWithExtendedIntrinsics.has(realm)) {
			ExtendIntrinsics(realm["[[Intrinsics]]"], extendedIntrinsics(realm));
			realmsWithExtendedIntrinsics.append(realm);
		}
		return realm as Realm<TIntrinsics>;
	}

	const realmRecord: Realm = {
		"[[Intrinsics]]": {} as TIntrinsics,
		"[[TemplateMap]]": makeList(),
		"[[GlobalEnv]]": undefined,
		"[[HostDefined]]": undefined,
		"[[GlobalObject]]": _globalThis
	};
	realms.set(_globalThis, realmRecord);
	CreateIntrinsics(realmRecord, extendedIntrinsics?.(realmRecord));

	if (extendedIntrinsics != null) {
		realmsWithExtendedIntrinsics.append(realmRecord);
	}

	return realmRecord as Realm<TIntrinsics>;
}
