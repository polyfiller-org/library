import {assert} from "./assert";
import {Constructor} from "../type/constructor";
import {IsConstructor} from "./is-constructor";
import {internals} from "../lib/internal-slot-map/internals";
import {List, makeList} from "../lib/list/list";

/**
 * The abstract operation Construct is used to call the [[Construct]] internal method of a function object.
 * The operation is called with arguments F, and optionally argumentsList, and newTarget where F is the function object.
 * argumentsList and newTarget are the values to be passed as the corresponding arguments of the internal method.
 * If argumentsList is not present, a new empty List is used as its value.
 * If newTarget is not present, F is used as its value.
 * https://tc39.es/ecma262/#sec-construct
 */
export function Construct<TF extends Constructor>(F: TF, argumentsList?: List, newTarget?: Constructor): InstanceType<TF> {
	// If newTarget is not present, set newTarget to F.
	if (newTarget === undefined) {
		newTarget = F;
	}

	// If argumentsList is not present, set argumentsList to a new empty List.
	if (argumentsList === undefined) {
		argumentsList = makeList();
	}

	// Assert: IsConstructor(F) is true.
	assert(IsConstructor(F), `Argument on position 0 must a Constructor`, TypeError);

	// Assert: IsConstructor(newTarget) is true.
	assert(IsConstructor(newTarget), `Argument on position 2 must a Constructor`, TypeError);

	// Return ? F.[[Construct]](argumentsList, newTarget).
	return internals(F)["[[Construct]]"](argumentsList, newTarget);
}
