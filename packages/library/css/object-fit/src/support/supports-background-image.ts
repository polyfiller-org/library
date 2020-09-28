import {UNSUPPORTED_ENVIRONMENT} from "./unsupported-environment";

/**
 * Is true if the browser natively supports the 'background-image' CSS-property
 * @type {boolean}
 */
export const SUPPORTS_BACKGROUND_IMAGE = !UNSUPPORTED_ENVIRONMENT && "backgroundImage" in document.documentElement.style;
