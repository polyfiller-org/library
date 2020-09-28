import {UNSUPPORTED_ENVIRONMENT} from "./unsupported-environment";
import {SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL} from "../constant/constant";

// Check if the client is Edge < 80 which doesn't support 'object-fit' on videos
const edgeUaMatch = navigator.userAgent.match(/Edge\/(\d{2})\./);
const edgeVersion = edgeUaMatch == null ? undefined : parseInt(edgeUaMatch[1]);

/**
 * Is true if the browser natively supports the 'object-fit' CSS-property on images.
 * @type {boolean}
 */
export const SUPPORTS_OBJECT_FIT_FOR_IMAGES = !UNSUPPORTED_ENVIRONMENT && window[SYMBOL_FORCE_APPLY_OBJECT_FIT_POLYFILL] !== true && "objectFit" in document.documentElement.style;

/**
 * Is true if the browser natively supports the 'object-fit' CSS-property on videos.
 * @type {boolean}
 */
export const SUPPORTS_OBJECT_FIT_FOR_VIDEOS = SUPPORTS_OBJECT_FIT_FOR_IMAGES && (edgeVersion == null || edgeVersion >= 80);
