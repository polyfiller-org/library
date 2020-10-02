import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {ObjectCreate} from "./object-create";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";
import {assert} from "./assert";
import {IsExtensible} from "./is-extensible";
import {CreateDataProperty} from "./create-data-property";
import {OrdinaryOwnPropertyKeys} from "./ordinary-own-property-keys";
import {makeList} from "../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-frompropertydescriptor
 * @param {InternalPropertyDescriptor} Desc
 * @returns {PropertyDescriptor}
 */
export function FromPropertyDescriptor(Desc: InternalPropertyDescriptor): PropertyDescriptor;
export function FromPropertyDescriptor(Desc: undefined): undefined;
export function FromPropertyDescriptor(Desc: InternalPropertyDescriptor | undefined): PropertyDescriptor | undefined;
export function FromPropertyDescriptor(Desc: InternalPropertyDescriptor | undefined): PropertyDescriptor | undefined {
	// If Desc is undefined, return undefined.
	if (Desc === undefined) {
		return undefined;
	}

	// Let obj be ObjectCreate(%Object.prototype%).
	const obj = ObjectCreate<PropertyDescriptor>(getCurrentIntrinsics()["[[%ObjectPrototype%]]"]);

	// Assert: obj is an extensible ordinary object with no own properties.
	assert(IsExtensible(obj) && OrdinaryOwnPropertyKeys(obj).length === 0);

	const createDataPropertyResults = makeList<boolean>();

	// If Desc has a [[Value]] field, then
	if ("[[Value]]" in Desc) {
		// Perform CreateDataProperty(obj, "value", Desc.[[Value]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "value", Desc["[[Value]]"]));
	}

	// If Desc has a [[Writable]] field, then
	if ("[[Value]]" in Desc) {
		// Perform CreateDataProperty(obj, "writable", Desc.[[Writable]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "writable", Desc["[[Writable]]"]));
	}

	// If Desc has a [[Get]] field, then
	if ("[[Get]]" in Desc) {
		// Perform CreateDataProperty(obj, "get", Desc.[[Get]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "get", Desc["[[Get]]"]));
	}

	// If Desc has a [[Set]] field, then
	if ("[[Set]]" in Desc) {
		// Perform CreateDataProperty(obj, "set", Desc.[[Set]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "set", Desc["[[Set]]"]));
	}

	// If Desc has a [[Enumerable]] field, then
	if ("[[Enumerable]]" in Desc) {
		// Perform CreateDataProperty(obj, "enumerable", Desc.[[Enumerable]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "enumerable", Desc["[[Enumerable]]"]));
	}

	// If Desc has a [[Configurable]] field, then
	if ("[[Configurable]]" in Desc) {
		// Perform CreateDataProperty(obj, "configurable", Desc.[[Configurable]]).
		createDataPropertyResults.append(CreateDataProperty(obj, "configurable", Desc["[[Configurable]]"]));
	}

	// Assert: All of the above CreateDataProperty operations return true.
	for (let i = 0; i < createDataPropertyResults.length; i++) {
		assert(createDataPropertyResults.get(i) === true);
	}

	// Return obj.
	return obj;
}
