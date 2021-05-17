/**
 * Regular expressions defining Unicode BCP 47 Locale Identifiers.
 * https://unicode.org/reports/tr35/#Unicode_locale_identifier
 */
export const alpha = "[a-z]";
export const digit = "[0-9]";
export const alphanum = "[a-z0-9]";
export const variant = "(" + alphanum + "{5,8}|(?:" + digit + alphanum + "{3}))";
export const region = "(" + alpha + "{2}|" + digit + "{3})";
export const script = "(" + alpha + "{4})";
export const language = "(" + alpha + "{2,3}|" + alpha + "{5,8})";
export const privateuse = "(x(-[a-z0-9]{1,8})+)";
export const singleton = "(" + digit + "|[a-wy-z])";
export const attribute= "(" + alphanum + "{3,8})";
export const keyword = "(" + alphanum + alpha + "(-" + alphanum + "{3,8})*)";
export const unicode_locale_extensions = "(u((-" + keyword + ")+|((-" + attribute + ")+(-" + keyword + ")*)))";
export const tlang = "(" + language + "(-" + script + ")?(-" + region + ")?(-" + variant + ")*)";
export const tfield = "(" + alpha + digit + "(-" + alphanum + "{3,8})+)";
export const transformed_extensions = "(t((-" + tlang + "(-" + tfield + ")*)|(-" + tfield + ")+))";
export const other_singleton = "(" + digit + "|[a-sv-wy-z])";
export const other_extensions = "(" + other_singleton + "(-" + alphanum + "{2,8})+)";
export const extension = "(" + unicode_locale_extensions + "|" + transformed_extensions + "|" + other_extensions + ")";
export const locale_id = language + "(-" + script + ")?(-" + region + ")?(-" + variant + ")*(-" + extension + ")*(-" + privateuse + ")?";
export const languageTag = "^(" + locale_id + ")$";
export const languageTagRE = new RegExp(languageTag, "i");
export const duplicateSingleton = "-" + singleton + "-(.*-)?\\1(?!" + alphanum + ")";
export const duplicateSingletonRE = new RegExp(duplicateSingleton, "i");
export const duplicateVariant = "(" + alphanum + "{2,8}-)+" + variant + "-(" + alphanum + "{2,8}-)*\\2(?!" + alphanum + ")";
export const duplicateVariantRE = new RegExp(duplicateVariant, "i");
export const transformKeyRE = new RegExp("^" + alpha + digit + "$", "i");