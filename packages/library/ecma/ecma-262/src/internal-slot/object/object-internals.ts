import {__DefineOwnProperty__} from "./define-own-property";
import {__Delete__} from "./delete";
import {__Get__} from "./get";
import {__GetOwnProperty__} from "./get-own-property";
import {__GetPrototypeOf__} from "./get-prototype-of";
import {__HasProperty__} from "./has-property";
import {__IsExtensible__} from "./is-extensible";
import {__Set__} from "./set";
import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";
import {__PreventExtensions__} from "./prevent-extensions";
import {__OwnPropertyKeys__} from "./own-property-keys";
import {__SetPrototypeOf__} from "./set-prototype-of";
import {List} from "../../lib/list/list";
import {createObjectWithPrototype} from "../../util/create-object-with-prototype";

/**
 * http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ordinary-object-internal-methods-and-internal-slots
 */
export interface ObjectInternalMethods {
	"[[DefineOwnProperty]]"(P: PropertyKey, Desc: InternalPropertyDescriptor): boolean;
	"[[Delete]]"<P extends PropertyKey>(P: P): boolean;
	"[[Get]]"<P extends keyof this, Receiver>(P: P, Receiver?: Receiver): this[P];
	"[[Get]]"<P extends PropertyKey, Receiver>(P: P, Receiver?: Receiver): this[keyof this] | undefined;
	"[[GetOwnProperty]]"(P: PropertyKey): InternalPropertyDescriptor | undefined;
	"[[GetPrototypeOf]]"(): Object | null;
	"[[SetPrototypeOf]]"(V: Object | null): any;
	"[[HasProperty]]"(P: PropertyKey): boolean;
	"[[IsExtensible]]"(): boolean;
	"[[PreventExtensions]]"(): boolean;
	"[[OwnPropertyKeys]]"(): List<PropertyKey>;
	"[[Set]]"<P extends keyof this, V extends this[P], Receiver>(P: P, V: V, Receiver: Receiver): boolean;
}

export interface ObjectInternalProperties {
	"[[Prototype]]": {} | null;
	"[[Extensible]]": boolean;
	"__[[PropertyAttributes]]__": Record<PropertyKey, InternalPropertyDescriptor | undefined>;
}

export interface ObjectInternals extends ObjectInternalMethods, ObjectInternalProperties {}

export const OBJECT_INTERNAL_METHODS: ObjectInternalMethods = {
	"[[DefineOwnProperty]]": __DefineOwnProperty__,
	"[[Delete]]": __Delete__,
	"[[Get]]": __Get__,
	"[[GetOwnProperty]]": __GetOwnProperty__,
	"[[GetPrototypeOf]]": __GetPrototypeOf__,
	"[[SetPrototypeOf]]": __SetPrototypeOf__,
	"[[HasProperty]]": __HasProperty__,
	"[[IsExtensible]]": __IsExtensible__,
	"[[PreventExtensions]]": __PreventExtensions__,
	"[[OwnPropertyKeys]]": __OwnPropertyKeys__,
	"[[Set]]": __Set__
};

export const OBJECT_INTERNAL_PROPERTY_DEFAULTS = (_obj: {}): Partial<ObjectInternalProperties> => ({
	"[[Extensible]]": true,
	"__[[PropertyAttributes]]__": createObjectWithPrototype(null)
});
