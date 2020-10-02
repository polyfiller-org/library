import {makeList} from "../lib/list/list";
import {OrdinaryCreateFromConstructor} from "./ordinary-create-from-constructor";
import {Constructor} from "../type/constructor";
import {DefinePropertyOrThrow} from "./define-property-or-throw";

/**
 * https://tc39.es/ecma262/#sec-regexpalloc
 */
export function RegExpAlloc(newTarget: unknown): RegExp {
	// Let obj be ? OrdinaryCreateFromConstructor(newTarget, "%RegExp.prototype%", « [[RegExpMatcher]], [[OriginalSource]], [[OriginalFlags]] »).
	const obj = OrdinaryCreateFromConstructor(
		newTarget as Constructor,
		"%RegExpPrototype%",
		makeList("[[RegExpMatcher]]", "[[OriginalSource]]", "[[OriginalFlags]]")
	);

	// Perform ! DefinePropertyOrThrow(obj, "lastIndex", PropertyDescriptor { [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }).
	DefinePropertyOrThrow(obj, "lastIndex", {"[[Writable]]": true, "[[Enumerable]]": false, "[[Configurable]]": false});

	// Return obj.
	return obj;
}
