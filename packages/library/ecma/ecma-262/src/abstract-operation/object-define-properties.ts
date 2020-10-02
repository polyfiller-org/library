import {internals} from "../lib/internal-slot-map/internals";
import {Type} from "./type";
import {ToObject} from "./to-object";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {Get} from "./get";
import {ToPropertyDescriptor} from "./to-property-descriptor";
import {DefinePropertyOrThrow} from "./define-property-or-throw";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-objectdefineproperties
 */
export function ObjectDefineProperties<T>(O: T, Properties: PropertyDescriptorMap & ThisType<any>): T {
	// If Type(O) is not Object, throw a TypeError exception.
	if (Type(O) !== "Object") {
		throw new TypeError();
	}

	// Let props be ? ToObject(Properties).
	const props = ToObject(Properties);

	// Let keys be ? props.[[OwnPropertyKeys]]().
	const keys = internals(props)["[[OwnPropertyKeys]]"]();

	// Let descriptors be a new empty List.
	const descriptors = makeList<[PropertyKey, InternalPropertyDescriptor]>();

	// For each element nextKey of keys in List order, do
	for (let i = 0; i < keys.length; i++) {
		const nextKey = keys.get(i);

		// Let propDesc be ? props.[[GetOwnProperty]](nextKey).
		const propDesc = internals(props)["[[GetOwnProperty]]"](nextKey);

		// If propDesc is not undefined and propDesc.[[Enumerable]] is true, then
		if (propDesc !== undefined && propDesc["[[Enumerable]]"] === true) {
			// Let descObj be ? Get(props, nextKey).
			const descObj = Get(props, nextKey as keyof typeof props);

			// Let desc be ? ToPropertyDescriptor(descObj).
			const desc = ToPropertyDescriptor(descObj);

			// Append the pair (a two element List) consisting of nextKey and desc to the end of descriptors.
			descriptors.append([nextKey, desc]);
		}
	}

	// For each pair from descriptors in list order, do
	for (let i = 0; i < descriptors.length; i++) {
		const pair = descriptors.get(i);

		// Let P be the first element of pair.
		const P = pair[0];

		// Let desc be the second element of pair.
		const desc = pair[1];

		// Perform ? DefinePropertyOrThrow(O, P, desc).
		DefinePropertyOrThrow(O, P, desc);
	}

	// Return O.
	return O;
}
