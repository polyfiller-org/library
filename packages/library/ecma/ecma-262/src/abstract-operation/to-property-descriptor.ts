import {Type} from "./type";
import {errorFormatArgument} from "../util/error-format-argument";
import {HasProperty} from "./has-property";
import {ToBoolean} from "./to-boolean";
import {Get} from "./get";
import {InternalPropertyDescriptor} from "../type/internal-property-descriptor";
import {IsCallable} from "./is-callable";

/**
 * https://tc39.es/ecma262/#sec-topropertydescriptor
 * @param {PropertyDescriptor} Obj
 * @returns {InternalPropertyDescriptor}
 */
export function ToPropertyDescriptor(Obj: PropertyDescriptor): InternalPropertyDescriptor {
	// If Type(Obj) is not Object, throw a TypeError exception.
	if (Type(Obj) !== "Object") {
		throw new TypeError(`Argument on position 0 ${errorFormatArgument(Obj)} must be an Object`);
	}

	// Let desc be a new Property Descriptor that initially has no fields.
	const desc = {} as InternalPropertyDescriptor;

	// Let hasEnumerable be ? HasProperty(Obj, "enumerable").
	const hasEnumerable = HasProperty(Obj, "enumerable");

	// If hasEnumerable is true, then
	if (hasEnumerable === true) {
		// Let enumerable be ! ToBoolean(? Get(Obj, "enumerable")).
		const enumerable = ToBoolean(Get(Obj, "enumerable"));

		// Set desc.[[Enumerable]] to enumerable.
		desc["[[Enumerable]]"] = enumerable;
	}

	// Let hasConfigurable be ? HasProperty(Obj, "configurable").
	const hasConfigurable = HasProperty(Obj, "configurable");

	// If hasConfigurable is true, then
	if (hasConfigurable === true) {
		// Let configurable be ! ToBoolean(? Get(Obj, "configurable")).
		const configurable = ToBoolean(Get(Obj, "configurable"));

		// Set desc.[[Configurable]] to configurable.
		desc["[[Configurable]]"] = configurable;
	}

	// Let hasValue be ? HasProperty(Obj, "value").
	const hasValue = HasProperty(Obj, "value");

	// If hasValue is true, then
	if (hasValue === true) {
		// Let value be ? Get(Obj, "value").
		const value = Get(Obj, "value");

		// Set desc.[[Value]] to value.
		desc["[[Value]]"] = value;
	}

	// Let hasWritable be ? HasProperty(Obj, "writable").
	const hasWritable = HasProperty(Obj, "writable");

	// If hasWritable is true, then
	if (hasWritable === true) {
		// Let writable be ! ToBoolean(? Get(Obj, "writable")).
		const writable = ToBoolean(Get(Obj, "writable"));

		// Set desc.[[Writable]] to writable.
		desc["[[Writable]]"] = writable;
	}

	// Let hasGet be ? HasProperty(Obj, "get").
	const hasGet = HasProperty(Obj, "get");

	// If hasGet is true, then
	if (hasGet === true) {
		// Let getter be ? Get(Obj, "get").
		const getter = Get(Obj, "get");
		// If IsCallable(getter) is false and getter is not undefined, throw a TypeError exception.
		if (IsCallable(getter) === false && getter !== undefined) {
			throw new TypeError();
		}

		// Set desc.[[Get]] to getter.
		desc["[[Get]]"] = getter;
	}

	// Let hasSet be ? HasProperty(Obj, "set").
	const hasSet = HasProperty(Obj, "set");

	// If hasSet is true, then
	if (hasSet === true) {
		// Let setter be ? Get(Obj, "set").
		const setter = Get(Obj, "set");

		// If IsCallable(setter) is false and setter is not undefined, throw a TypeError exception.
		if (IsCallable(setter) === false && setter !== undefined) {
			throw new TypeError();
		}

		// Set desc.[[Set]] to setter.
		desc["[[Set]]"] = setter;
	}

	// If desc.[[Get]] is present or desc.[[Set]] is present, then
	if ("[[Get]]" in desc || "[[Set]]" in desc) {
		// If desc.[[Value]] is present or desc.[[Writable]] is present, throw a TypeError exception.
		if ("[[Value]]" in desc || "[[Writable]]" in desc) {
			throw new TypeError(`Invalid property descriptor. Cannot both specify accessors and a value or writable attribute`);
		}
	}

	// Return desc.
	return desc;
}
