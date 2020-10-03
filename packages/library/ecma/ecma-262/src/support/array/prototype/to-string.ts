import {safeHasOwnProperty} from "../../../util/safe-has-own-property";

export const SUPPORTS_ARRAY_PROTOTYPE_TO_STRING = safeHasOwnProperty(Array.prototype, "toString")
