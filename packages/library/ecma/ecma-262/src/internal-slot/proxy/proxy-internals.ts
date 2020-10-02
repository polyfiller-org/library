import {InternalPropertyDescriptor} from "../../type/internal-property-descriptor";
import {Constructor} from "../../type/constructor";
import {OBJECT_INTERNAL_PROPERTY_DEFAULTS, ObjectInternalMethods, ObjectInternalProperties} from "../object/object-internals";
import {__ProxyGetPrototypeOf__} from "./get-prototype-of";
import {__ProxySetPrototypeOf__} from "./set-prototype-of";
import {__ProxyIsExtensible__} from "./is-extensible";
import {__ProxyPreventExtensions__} from "./prevent-extensions";
import {__ProxyGetOwnProperty__} from "./get-own-property";
import {__ProxyDefineOwnProperty__} from "./define-own-property";
import {__ProxyHasProperty__} from "./has-property";
import {__ProxyGet__} from "./get";
import {__ProxySet__} from "./set";
import {__ProxyDelete__} from "./delete";
import {__ProxyOwnPropertyKeys__} from "./own-property-keys";
import {__ProxyCall__} from "./call";
import {__ProxyConstruct__} from "./construct";
import {List} from "../../lib/list/list";

/**
 * https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots
 */
export interface ProxyInternalMethods extends ObjectInternalMethods {
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

	// A Proxy exotic object only has a [[Call]] internal method if the initial value of
	// its [[ProxyTarget]] internal slot is an object that has a [[Call]] internal method.
	// https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-call-thisargument-argumentslist
	"[[Call]]"?(thisArgument: any, argumentsList: List): ReturnType<any>;

	// A Proxy exotic object only has a [[Construct]] internal method if the initial value of
	// its [[ProxyTarget]] internal slot is an object that has a [[Construct]] internal method.
	// https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-construct-argumentslist-newtarget
	"[[Construct]]"?(argumentsList: any, newTarget: Constructor): InstanceType<any>;
}

export interface ProxyInternalProperties extends ObjectInternalProperties {
	"[[ProxyHandler]]": ProxyHandler<object> | null;
	"[[ProxyTarget]]": object | null;
	"[[RevocableProxy]]": object | null;
}

export interface ProxyInternals extends ProxyInternalMethods, ProxyInternalProperties {}

export const PROXY_INTERNAL_METHODS: ProxyInternalMethods = {
	"[[DefineOwnProperty]]": __ProxyDefineOwnProperty__,
	"[[Delete]]": __ProxyDelete__,
	"[[Get]]": __ProxyGet__,
	"[[GetOwnProperty]]": __ProxyGetOwnProperty__,
	"[[GetPrototypeOf]]": __ProxyGetPrototypeOf__,
	"[[SetPrototypeOf]]": __ProxySetPrototypeOf__,
	"[[HasProperty]]": __ProxyHasProperty__,
	"[[IsExtensible]]": __ProxyIsExtensible__,
	"[[PreventExtensions]]": __ProxyPreventExtensions__,
	"[[OwnPropertyKeys]]": __ProxyOwnPropertyKeys__,
	"[[Set]]": __ProxySet__,
	"[[Call]]": __ProxyCall__,
	"[[Construct]]": __ProxyConstruct__
};

export const PROXY_INTERNAL_PROPERTY_DEFAULTS = (obj: {}): Partial<ProxyInternalProperties> => ({
	...OBJECT_INTERNAL_PROPERTY_DEFAULTS(obj)
});
