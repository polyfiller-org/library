import {Realm} from "./realm";
import {Intrinsics} from "../../intrinsic/intrinsics";
import {CreateIntrinsics} from "../../abstract-operation/create-intrinsics";
import {makeList} from "../../lib/list/list";
import {MapLike} from "../../lib/map-like/map-like";

const realms = new MapLike<typeof globalThis, Realm>();

export function getRealmFromGlobalThis(_globalThis: typeof globalThis): Realm {
	if (realms.has(_globalThis)) {
		return realms.get(_globalThis)!;
	}

	const realmRecord: Realm = {
		"[[Intrinsics]]": {} as Intrinsics,
		"[[TemplateMap]]": makeList(),
		"[[GlobalEnv]]": undefined,
		"[[HostDefined]]": undefined,
		"[[GlobalObject]]": _globalThis
	};
	realms.set(_globalThis, realmRecord);
	CreateIntrinsics(realmRecord);
	return realmRecord;
}
