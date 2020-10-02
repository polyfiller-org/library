import {createGlobalObject} from "../environment/realm/create-global-object";

let isolatedGlobal: typeof globalThis | undefined;

export function getIsolatedGlobal(): typeof globalThis {
	if (isolatedGlobal == null) isolatedGlobal = createGlobalObject();
	return isolatedGlobal;
}
