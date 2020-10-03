import {Constructor} from "../type/constructor";
import {assert} from "./assert";
import {IsCallable} from "./is-callable";
import {Get} from "./get";
import {Type} from "./type";
import {INTRINSIC_OBJECT_NAME, IntrinsicObjectName, intrinsicObjectNameToIntrinsicPropertyKey} from "../intrinsic/intrinsic-object-name";
import {GetFunctionRealm} from "./get-function-realm";
import {Intrinsics} from "../intrinsic/intrinsics";

/**
 * The abstract operation GetPrototypeFromConstructor determines the [[Prototype]] value that should be used to
 * create an object corresponding to a specific constructor. The value is retrieved from the constructor's prototype
 * property, if it exists. Otherwise the intrinsic named by intrinsicDefaultProto is used for [[Prototype]].
 * Note that this implementation slightly alters the original in that rather than taking the identifier for the intrinsicDefaultProto,
 * the actual intrinsicDefaultProto is provided for tree-shaking purposes
 * https://tc39.es/ecma262/#sec-getprototypefromconstructor
 */
export function GetPrototypeFromConstructor<C extends Constructor, R extends IntrinsicObjectName, Proto extends Intrinsics[typeof intrinsicObjectNameToIntrinsicPropertyKey[R]]>(
	constructor: C,
	intrinsicDefaultProto: R
): Proto {
	// Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
	// The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
	assert(INTRINSIC_OBJECT_NAME.indexOf(intrinsicDefaultProto) >= 0);

	// Assert: IsCallable(constructor) is true.
	assert(IsCallable(constructor));

	// Let proto be ? Get(constructor, "prototype").
	let proto = Get(constructor as {prototype: {}}, "prototype");

	// If Type(proto) is not Object, then
	if (Type(proto) !== "Object") {
		// Let realm be ? GetFunctionRealm(constructor).
		const realm = GetFunctionRealm(constructor);

		// Set proto to realm's intrinsic object named intrinsicDefaultProto.
		proto = realm["[[Intrinsics]]"][intrinsicObjectNameToIntrinsicPropertyKey[intrinsicDefaultProto]];
	}

	// Return proto.
	return proto as Proto;
}
