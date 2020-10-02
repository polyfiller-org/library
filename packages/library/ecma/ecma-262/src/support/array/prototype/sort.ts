import {testStableSort} from "../../../util/test-stable-sort";

export const SUPPORTS_ARRAY_PROTOTYPE_SORT = "sort" in Array.prototype && testStableSort();
