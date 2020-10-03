import {assert} from "./assert";
import {ArbitraryFunction} from "../type/arbitrary-function";
import {getCurrentRealmRecord} from "../environment/realm/get-current-realm-record";
import {IsRealm} from "./is-realm";
import {Realm} from "../environment/realm/realm";
import {internals} from "../lib/internal-slot-map/internals";
import {List} from "../lib/list/list";

/**
 * The abstract operation CreateBuiltinFunction takes arguments steps, internalSlotsList, realm, and prototype.
 * The argument internalSlotsList is a List of the names of additional internal slots that must be defined as part
 * of the object.
 * https://tc39.es/ecma262/#sec-createbuiltinfunction
 */
export function CreateBuiltinFunction<T extends ArbitraryFunction, Prototype extends {} | null = {}>(
	steps: T,
	internalSlotsList: List<string>,
	realm?: Realm,
	prototype?: Prototype
): T & Prototype {
	// Assert: steps is either a set of algorithm steps or
	// other definition of a function's behaviour provided in this specification.
	assert(typeof steps === "function");

	// If realm is not present, set realm to the current Realm Record.
	if (realm === undefined) {
		realm = getCurrentRealmRecord();
	}

	// Assert: realm is a Realm Record.
	assert(IsRealm(realm));

	// If prototype is not present, set prototype to realm.[[Intrinsics]].[[%FunctionPrototype%]].
	if (prototype === undefined) {
		prototype = (realm["[[Intrinsics]]"]["[[%FunctionPrototype%]]"] as unknown) as Prototype;
	}

	// Let func be a new built-in function object that when called performs
	// the action described by steps. The new function object has internal slots
	// whose names are the elements of internalSlotsList.
	// The initial value of each of those internal slots is undefined.
	const func = realm["[[Intrinsics]]"]["[[%Function%]]"]("steps", "return function () {return steps.apply(this, arguments);}")(steps) as Function;

	for (let i = 0; i < internalSlotsList.length; i++) {
		((internals as unknown) as (obj: Object) => Record<string, undefined>)(func)[internalSlotsList.get(i)] = undefined;
	}

	// Set func.[[Realm]] to realm.
	internals(func)["[[Realm]]"] = realm;

	// Set func.[[Prototype]] to prototype.
	internals(func)["[[Prototype]]"] = prototype;

	// Set func.[[Extensible]] to true.
	internals(func)["[[Extensible]]"] = true;

	// Set func.[[ScriptOrModule]] to null.
	internals(func)["[[ScriptOrModule]]"] = null;

	// Return func.
	return (func as unknown) as T & Prototype;
}
