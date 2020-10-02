import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#table-44
 */
export interface GlobalSymbolRegistryEntry {
	"[[Key]]": string;
	"[[Symbol]]": symbol;
}

/**
 * The GlobalSymbolRegistry is a List that is globally available. It is shared by all realms.
 * Prior to the evaluation of any ECMAScript code it is initialized as a new empty List.
 * Elements of the GlobalSymbolRegistry are Records with the structure defined in Table 50 {@link https://tc39.es/ecma262/#table-44}.
 * NOTE: Sharing a registry across realms is not polyfillable
 * @type {List<string>}
 */
export const GlobalSymbolRegistry = makeList<GlobalSymbolRegistryEntry>();
