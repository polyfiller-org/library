import {UNSUPPORTED_ENVIRONMENT} from "../support/unsupported-environment";
import {SUPPORTS_OBJECT_POSITION} from "../support/supports-object-position";
import {patch} from "../patch/patch";
import {SUPPORTS_OBJECT_FIT_FOR_IMAGES, SUPPORTS_OBJECT_FIT_FOR_VIDEOS} from "../support/supports-object-fit";

if (!UNSUPPORTED_ENVIRONMENT && (!SUPPORTS_OBJECT_FIT_FOR_IMAGES || !SUPPORTS_OBJECT_FIT_FOR_VIDEOS || !SUPPORTS_OBJECT_POSITION)) {
	patch();
}
