import {OrdinaryGetOwnProperty} from "../../abstract-operation/ordinary-get-own-property";
import {InternalGetAccessorDescriptor} from "../../type/internal-property-descriptor";
import {Type} from "../../abstract-operation/type";
import {errorFormatArgument} from "../../util/error-format-argument";
import {ToString} from "../../abstract-operation/to-string";
import {Get} from "../../abstract-operation/get";
import {Set} from "../../abstract-operation/set";
import {ToLength} from "../../abstract-operation/to-length";
import {getCurrentIntrinsics} from "../../environment/realm/get-current-intrinsics";
import {Construct} from "../../abstract-operation/construct";
import {makeList} from "../../lib/list/list";
import {SpeciesConstructor} from "../../abstract-operation/species-constructor";
import {CreateRegExpStringIterator} from "../../abstract-operation/create-reg-exp-string-iterator";

/**
 * The value of the "name" property of this function is "[Symbol.matchAll]".
 * https://tc39.es/ecma262/#sec-regexp-prototype-matchall
 */
export const regExpPrototypeSymbolMatchAll = () =>
	(
		OrdinaryGetOwnProperty(
			{
				"[Symbol.matchAll]"(this: RegExp, string: string): IterableIterator<RegExpMatchArray> {
					// Let R be the this value.
					const R = this;

					// If Type(R) is not Object, throw a TypeError exception.
					if (Type(R) !== "Object") {
						throw new TypeError(`RegExp.prototype.@@matchAll called on incompatible receiver ${errorFormatArgument(R)}`);
					}

					// Let S be ? ToString(string).
					const S = ToString(string);

					const intrinsics = getCurrentIntrinsics();

					// Let C be ? SpeciesConstructor(R, %RegExp%).
					const C = SpeciesConstructor(R, intrinsics["[[%RegExp%]]"]);

					// Let flags be ? ToString(? Get(R, "flags")).
					const flags = ToString(Get(R, "flags"));

					// Let matcher be ? Construct(C, « R, flags »).
					const matcher = Construct(C, makeList(R, flags)) as RegExp;

					// Let lastIndex be ? ToLength(? Get(R, "lastIndex")).
					const lastIndex = ToLength(Get(R, "lastIndex"));

					// Perform ? Set(matcher, "lastIndex", lastIndex, true).
					Set(matcher, "lastIndex", lastIndex, true);

					// If flags contains "g", let global be true.
					// Else, let global be false.
					let global = false;
					for (let i = 0; i < flags.length; i++) {
						if (flags[i] === "g") {
							global = true;
						}
					}

					// If flags contains "u", let fullUnicode be true.
					// Else, let fullUnicode be false.
					let fullUnicode = false;
					for (let i = 0; i < flags.length; i++) {
						if (flags[i] === "u") {
							fullUnicode = true;
						}
					}

					// Return ! CreateRegExpStringIterator(matcher, S, global, fullUnicode).
					return CreateRegExpStringIterator(matcher, S, global, fullUnicode);
				}
			},
			"[Symbol.matchAll]"
		) as InternalGetAccessorDescriptor
	)["[[Value]]"];
