import {Constructor} from "../type/constructor";
import {ObjectCreate} from "./object-create";
import {GetPrototypeFromConstructor} from "./get-prototype-from-constructor";
import {INTRINSIC_OBJECT_NAME, IntrinsicObjectName, intrinsicObjectNameToIntrinsicPropertyKey} from "../intrinsic/intrinsic-object-name";
import {assert} from "./assert";
import {Intrinsics} from "../intrinsic/intrinsics";
import {List} from "../lib/list/list";

/**
 * The abstract operation OrdinaryCreateFromConstructor creates an ordinary object whose [[Prototype]]
 * value is retrieved from a constructor's prototype property, if it exists. Otherwise the intrinsic named
 * by intrinsicDefaultProto is used for [[Prototype]]. The optional internalSlotsList is a List of the names
 * of additional internal slots that must be defined as part of the object. If the list is not provided, a
 * new empty List is used.
 * Note that this implementation slightly alters the original in that rather than taking the identifier for the intrinsicDefaultProto,
 * the actual intrinsicDefaultProto is provided for tree-shaking purposes
 * https://tc39.es/ecma262/#sec-ordinarycreatefromconstructor
 */
export function OrdinaryCreateFromConstructor<C extends Constructor, R extends IntrinsicObjectName, Proto extends Intrinsics[typeof intrinsicObjectNameToIntrinsicPropertyKey[R]]>(
	constructor: C,
	intrinsicDefaultProto: R,
	internalSlotsList?: List<string>
): Proto {
	// Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
	// The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
	assert(INTRINSIC_OBJECT_NAME.indexOf(intrinsicDefaultProto) >= 0);

	// Let proto be ? GetPrototypeFromConstructor(constructor, intrinsicDefaultProto).
	const proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

	// Return ObjectCreate(proto, internalSlotsList).
	return ObjectCreate<Proto>(proto, internalSlotsList);
}
