import {internals} from "../lib/internal-slot-map/internals";
import {ToObject} from "../abstract-operation/to-object";
import {FromPropertyDescriptor} from "../abstract-operation/from-property-descriptor";
import {ToPropertyKey} from "../abstract-operation/to-property-key";

/**
 * https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
 */
export const {getOwnPropertyDescriptor: objectGetOwnPropertyDescriptor} = {
	getOwnPropertyDescriptor<TO, TP extends PropertyKey>(O: TO, P: TP) {
		// Let obj be ? ToObject(O).
		const obj = ToObject(O);

		// Let key be ? ToPropertyKey(P).
		const key = ToPropertyKey(P);

		// Let desc be ? obj.[[GetOwnProperty]](key).
		const desc = internals(obj)["[[GetOwnProperty]]"](key);

		// Return FromPropertyDescriptor(desc).
		return FromPropertyDescriptor(desc);
	}
};
