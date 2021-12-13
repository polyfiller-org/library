import {UNSUPPORTED_ENVIRONMENT, IS_FORM_DATA_SUPPORTED, IS_POLYFILLABLE_PROTOTYPE_METHODS_SUPPORTED} from "../support";
import {patch} from "../patch/patch";

if (!UNSUPPORTED_ENVIRONMENT) {
	if (IS_FORM_DATA_SUPPORTED) {
		if (!IS_POLYFILLABLE_PROTOTYPE_METHODS_SUPPORTED) {
			// Fill holes in the FormData support
			patch(false);
		}
	} else {
		// Completely replace FormData
		patch(true);
	}
}
