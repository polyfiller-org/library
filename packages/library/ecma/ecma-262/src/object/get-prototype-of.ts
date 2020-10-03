import {ToObject} from "../abstract-operation/to-object";
import {internals} from "../lib/internal-slot-map/internals";

/**
 * https://tc39.es/ecma262/#sec-object.getprototypeof
 */
export const {getPrototypeOf: objectGetPrototypeOf} = {
	getPrototypeOf<TO>(O: TO) {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Return ? obj.[[GetPrototypeOf]]().
		return internals(obj)["[[GetPrototypeOf]]"]();
	}
};
