import {Type} from "./type";
import {Constructor} from "../type/constructor";
import {getCurrentIntrinsics} from "../environment/realm/get-current-intrinsics";

/**
 * The abstract operation IsConstructor determines if argument, which must be an ECMAScript language value,
 * is a function object with a [[Construct]] internal method.
 * https://tc39.es/ecma262/#sec-isconstructor
 * @param {*} argument
 * @returns {argument is Constructor}
 */
export function IsConstructor<T>(argument: Constructor<T>): argument is Constructor<T>;
export function IsConstructor(argument: unknown): argument is Constructor;
export function IsConstructor<T>(argument: unknown | Constructor<T>): argument is Constructor<T> {
	// If Type(argument) is not Object, return false.
	if (Type(argument) !== "Object") {
		return false;
	}

	// If argument has a [[Construct]] internal method, return true.
	// Return false.
	if (typeof argument !== "function") return false;

	const handler = {
		construct() {
			return handler;
		}
	};

	const proxyConstructor = getCurrentIntrinsics()["[[%Proxy%]]"];
	const typeErrorConstructor = getCurrentIntrinsics()["[[%TypeError%]]"];

	try {
		if (proxyConstructor != null) {
			return !!new new proxyConstructor(argument as Constructor<T>, handler)();
		} else {
			new (argument as Constructor<T>)();
			return true;
		}
	} catch (ex) {
		return !(ex instanceof typeErrorConstructor);
	}
}
