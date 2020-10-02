import {mapPrototypeEntries} from "./entries";

/**
 * The initial value of the @@iterator property is the same function
 * object as the initial value of the entries property.
 * https://tc39.es/ecma262/#sec-map.prototype-@@iterator
 */
export const mapPrototypeSymbolIterator: <Key, Value>() => IterableIterator<[Key, Value]> = mapPrototypeEntries;
