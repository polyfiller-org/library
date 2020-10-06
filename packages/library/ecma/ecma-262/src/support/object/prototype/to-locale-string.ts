import {safeHasOwnProperty} from "../../../util/safe-has-own-property";

export const SUPPORTS_OBJECT_PROTOTYPE_TO_LOCALE_STRING = safeHasOwnProperty(Object.prototype, "toLocaleString");
