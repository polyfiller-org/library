import {duplicateSingletonRE, duplicateVariantRE, languageTagRE} from "../data/locale-matchers";

/**
 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale argument (which must be a String value)
 * represents a well-formed Unicode BCP 47 Locale Identifier" as specified in Unicode Technical Standard 35 section 3.2, or successor,
 * - does not include duplicate variant subtags, and
 * - does not include duplicate singleton subtags.
 * The abstract operation returns true if locale can be generated from the EBNF grammar in section 3.2 of the Unicode Technical Standard 35, or successor,
 * starting with unicode_locale_id, and does not contain duplicate variant or singleton subtags (other than as a private use subtag).
 * It returns false otherwise. Terminal value characters in the grammar are interpreted as the Unicode equivalents of the ASCII octet values given.
 *
 * https://tc39.github.io/ecma402/#sec-isstructurallyvalidlanguagetag
 */
export function isStructurallyValidLanguageTag(locale: string): boolean {
	if (!languageTagRE.test(locale)) {
		return false;
	}
	locale = locale.split(/-x-/)[0];
	return !duplicateSingletonRE.test(locale) && !duplicateVariantRE.test(locale);
}