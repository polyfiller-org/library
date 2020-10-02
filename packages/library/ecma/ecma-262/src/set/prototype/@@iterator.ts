import {setPrototypeValues} from "./values";

/**
 * The initial value of the @@iterator property is the same function object as the
 * initial value of the "values" property.
 * https://tc39.es/ecma262/#sec-set.prototype-@@iterator
 */
export const setPrototypeSymbolIterator: <Value>() => IterableIterator<Value> = setPrototypeValues;
