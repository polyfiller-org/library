import {UNSUPPORTED_ENVIRONMENT} from "./unsupported-environment";
import {SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL} from "../constant/constant";

/**
 * Is true if the browser natively supports the 'object-position' CSS-property.
 * @type {boolean}
 */
export const SUPPORTS_OBJECT_POSITION = !UNSUPPORTED_ENVIRONMENT && window[SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL] !== true && "objectPosition" in document.documentElement.style;
