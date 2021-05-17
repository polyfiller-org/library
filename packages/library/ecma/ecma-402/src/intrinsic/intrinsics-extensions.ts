import {$Collator$} from "./collator";
import {$CollatorPrototype$} from "./collator-prototype";
import {$Date_now$} from "./date-now";
import {$DateTimeFormat$} from "./date-time-format";
import {$DateTimeFormatPrototype$} from "./date-time-format-prototype";
import {$Intl$} from "./intl";
import {$Locale$} from "./locale";
import {$LocalePrototype$} from "./locale-prototype";
import {$NumberFormat$} from "./number-format";
import {$NumberFormatPrototype$} from "./number-format-prototype";
import {$PluralRules$} from "./plural-rules";
import {$PluralRulesPrototype$} from "./plural-rules-prototype";
import {$RelativeTimeFormat$} from "./relative-time-format";
import {$RelativeTimeFormatPrototype$} from "./relative-time-format-prototype";
import {$StringProto_indexOf$} from "./string-proto-index-of";
import {Ecma402Intrinsics} from "./intrinsics";
import {Realm} from "@polyfiller/ecma-262";

/**
 * https://www.ecma-international.org/ecma-402/7.0/index.html#sec-402-well-known-intrinsic-objects
 */
export const INTRINSICS_EXTENSIONS: (realm: Realm) => Ecma402Intrinsics = realm => ({
	"[[%Collator%]]": $Collator$(realm),
	"[[%CollatorPrototype%]]": $CollatorPrototype$(realm),
	"[[%Date_now%]]": $Date_now$(realm),
	"[[%DateTimeFormat%]]": $DateTimeFormat$(realm),
	"[[%DateTimeFormatPrototype%]]": $DateTimeFormatPrototype$(realm),
	"[[%Intl%]]": $Intl$(realm),
	"[[%Locale%]]": $Locale$(realm),
	"[[%LocalePrototype%]]": $LocalePrototype$(realm),
	"[[%NumberFormat%]]": $NumberFormat$(realm),
	"[[%NumberFormatPrototype%]]": $NumberFormatPrototype$(realm),
	"[[%PluralRules%]]": $PluralRules$(realm),
	"[[%PluralRulesPrototype%]]": $PluralRulesPrototype$(realm),
	"[[%RelativeTimeFormat%]]": $RelativeTimeFormat$(realm),
	"[[%RelativeTimeFormatPrototype%]]": $RelativeTimeFormatPrototype$(realm),
	"[[%StringProto_indexOf%]]": $StringProto_indexOf$(realm)
});
