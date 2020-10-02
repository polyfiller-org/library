import {arrayPrototypeValues} from "./values";

/**
 * The initial value of the @@iterator property is the same function object as the initial value of the
 * Array.prototype.values property.
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-array.prototype-@@iterator
 * @return {ArrayConstructor}
 */
export const arrayPrototypeSymbolIterator: <T>() => IterableIterator<T> = arrayPrototypeValues;
