import {Intrinsics as Ecma262Intrinsics} from "@polyfiller/ecma-262";

/**
 * https://www.ecma-international.org/ecma-402/7.0/index.html#sec-402-well-known-intrinsic-objects
 */
export interface Ecma402Intrinsics {
	"[[%Collator%]]": typeof Intl.Collator;
	"[[%CollatorPrototype%]]": typeof Intl.Collator.prototype;
	"[[%Date_now%]]": typeof Date.now;
	"[[%DateTimeFormat%]]": typeof Intl.DateTimeFormat;
	"[[%DateTimeFormatPrototype%]]": typeof Intl.DateTimeFormat.prototype;
	"[[%Intl%]]": typeof Intl;
	"[[%Locale%]]": typeof Intl.Locale;
	"[[%LocalePrototype%]]": typeof Intl.Locale.prototype;
	"[[%NumberFormat%]]": typeof Intl.NumberFormat;
	"[[%NumberFormatPrototype%]]": typeof Intl.NumberFormat.prototype;
	"[[%PluralRules%]]": typeof Intl.PluralRules;
	"[[%PluralRulesPrototype%]]": typeof Intl.PluralRules.prototype;
	"[[%RelativeTimeFormat%]]": typeof Intl.RelativeTimeFormat;
	"[[%RelativeTimeFormatPrototype%]]": typeof Intl.RelativeTimeFormat.prototype;
	"[[%StringProto_indexOf%]]": typeof String.prototype.indexOf;
}

export interface Intrinsics extends Ecma262Intrinsics, Ecma402Intrinsics {}