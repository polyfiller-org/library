/**
 * Verifies that the given string is a well-formed Unicode BCP 47 Locale Identifier
 * with no duplicate variant or singleton subtags.
 *
 * Spec: ECMAScript Internationalization API Specification, draft, 6.2.2.
 */
import {duplicateSingletonRE, duplicateVariantRE, languageTagRE} from "../data/locale-matchers";

function isStructurallyValidLanguageTag (locale) {
	if (!languageTagRE.test(locale)) {
		return false;
	}
	locale = locale.split(/-x-/)[0];
	return !duplicateSingletonRE.test(locale) && !duplicateVariantRE.test(locale);
}


/**
 * Mappings from complete tags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __tagMappings = {
	// property names must be in lower case; values in canonical form

	"art-lojban": "jbo",
	"cel-gaulish": "xtg-x-cel-gaulish",
	"zh-guoyu": "zh",
	"zh-hakka": "hak",
	"zh-xiang": "hsn",
};


/**
 * Mappings from language subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __languageMappings = {
	// property names and values must be in canonical case

	"aam": "aas",
	"aar": "aa",
	"abk": "ab",
	"adp": "dz",
	"afr": "af",
	"aju": "jrb",
	"aka": "ak",
	"alb": "sq",
	"als": "sq",
	"amh": "am",
	"ara": "ar",
	"arb": "ar",
	"arg": "an",
	"arm": "hy",
	"asd": "snz",
	"asm": "as",
	"aue": "ktz",
	"ava": "av",
	"ave": "ae",
	"aym": "ay",
	"ayr": "ay",
	"ayx": "nun",
	"aze": "az",
	"azj": "az",
	"bak": "ba",
	"bam": "bm",
	"baq": "eu",
	"bcc": "bal",
	"bcl": "bik",
	"bel": "be",
	"ben": "bn",
	"bgm": "bcg",
	"bh": "bho",
	"bih": "bho",
	"bis": "bi",
	"bjd": "drl",
	"bod": "bo",
	"bos": "bs",
	"bre": "br",
	"bul": "bg",
	"bur": "my",
	"bxk": "luy",
	"bxr": "bua",
	"cat": "ca",
	"ccq": "rki",
	"ces": "cs",
	"cha": "ch",
	"che": "ce",
	"chi": "zh",
	"chu": "cu",
	"chv": "cv",
	"cjr": "mom",
	"cka": "cmr",
	"cld": "syr",
	"cmk": "xch",
	"cmn": "zh",
	"cor": "kw",
	"cos": "co",
	"coy": "pij",
	"cqu": "quh",
	"cre": "cr",
	"cwd": "cr",
	"cym": "cy",
	"cze": "cs",
	"dan": "da",
	"deu": "de",
	"dgo": "doi",
	"dhd": "mwr",
	"dik": "din",
	"diq": "zza",
	"dit": "dif",
	"div": "dv",
	"drh": "mn",
	"dut": "nl",
	"dzo": "dz",
	"ekk": "et",
	"ell": "el",
	"emk": "man",
	"eng": "en",
	"epo": "eo",
	"esk": "ik",
	"est": "et",
	"eus": "eu",
	"ewe": "ee",
	"fao": "fo",
	"fas": "fa",
	"fat": "ak",
	"fij": "fj",
	"fin": "fi",
	"fra": "fr",
	"fre": "fr",
	"fry": "fy",
	"fuc": "ff",
	"ful": "ff",
	"gav": "dev",
	"gaz": "om",
	"gbo": "grb",
	"geo": "ka",
	"ger": "de",
	"gfx": "vaj",
	"ggn": "gvr",
	"gla": "gd",
	"gle": "ga",
	"glg": "gl",
	"glv": "gv",
	"gno": "gon",
	"gre": "el",
	"grn": "gn",
	"gti": "nyc",
	"gug": "gn",
	"guj": "gu",
	"guv": "duz",
	"gya": "gba",
	"hat": "ht",
	"hau": "ha",
	"hdn": "hai",
	"hea": "hmn",
	"heb": "he",
	"her": "hz",
	"him": "srx",
	"hin": "hi",
	"hmo": "ho",
	"hrr": "jal",
	"hrv": "hr",
	"hun": "hu",
	"hye": "hy",
	"ibi": "opa",
	"ibo": "ig",
	"ice": "is",
	"ido": "io",
	"iii": "ii",
	"ike": "iu",
	"iku": "iu",
	"ile": "ie",
	"ilw": "gal",
	"in": "id",
	"ina": "ia",
	"ind": "id",
	"ipk": "ik",
	"isl": "is",
	"ita": "it",
	"iw": "he",
	"jav": "jv",
	"jeg": "oyb",
	"ji": "yi",
	"jpn": "ja",
	"jw": "jv",
	"kal": "kl",
	"kan": "kn",
	"kas": "ks",
	"kat": "ka",
	"kau": "kr",
	"kaz": "kk",
	"kgc": "tdf",
	"kgh": "kml",
	"khk": "mn",
	"khm": "km",
	"kik": "ki",
	"kin": "rw",
	"kir": "ky",
	"kmr": "ku",
	"knc": "kr",
	"kng": "kg",
	"knn": "kok",
	"koj": "kwv",
	"kom": "kv",
	"kon": "kg",
	"kor": "ko",
	"kpv": "kv",
	"krm": "bmf",
	"ktr": "dtp",
	"kua": "kj",
	"kur": "ku",
	"kvs": "gdj",
	"kwq": "yam",
	"kxe": "tvd",
	"kzj": "dtp",
	"kzt": "dtp",
	"lao": "lo",
	"lat": "la",
	"lav": "lv",
	"lbk": "bnc",
	"lii": "raq",
	"lim": "li",
	"lin": "ln",
	"lit": "lt",
	"llo": "ngt",
	"lmm": "rmx",
	"ltz": "lb",
	"lub": "lu",
	"lug": "lg",
	"lvs": "lv",
	"mac": "mk",
	"mah": "mh",
	"mal": "ml",
	"mao": "mi",
	"mar": "mr",
	"may": "ms",
	"meg": "cir",
	"mhr": "chm",
	"mkd": "mk",
	"mlg": "mg",
	"mlt": "mt",
	"mnk": "man",
	"mo": "ro",
	"mol": "ro",
	"mon": "mn",
	"mri": "mi",
	"msa": "ms",
	"mst": "mry",
	"mup": "raj",
	"mwj": "vaj",
	"mya": "my",
	"myd": "aog",
	"myt": "mry",
	"nad": "xny",
	"nau": "na",
	"nav": "nv",
	"nbl": "nr",
	"ncp": "kdz",
	"nde": "nd",
	"ndo": "ng",
	"nep": "ne",
	"nld": "nl",
	"nno": "nn",
	"nns": "nbr",
	"nnx": "ngv",
	"no": "nb",
	"nob": "nb",
	"nor": "nb",
	"npi": "ne",
	"nts": "pij",
	"nya": "ny",
	"oci": "oc",
	"ojg": "oj",
	"oji": "oj",
	"ori": "or",
	"orm": "om",
	"ory": "or",
	"oss": "os",
	"oun": "vaj",
	"pan": "pa",
	"pbu": "ps",
	"pcr": "adx",
	"per": "fa",
	"pes": "fa",
	"pli": "pi",
	"plt": "mg",
	"pmc": "huw",
	"pmu": "phr",
	"pnb": "lah",
	"pol": "pl",
	"por": "pt",
	"ppa": "bfy",
	"ppr": "lcq",
	"pry": "prt",
	"pus": "ps",
	"puz": "pub",
	"que": "qu",
	"quz": "qu",
	"rmy": "rom",
	"roh": "rm",
	"ron": "ro",
	"rum": "ro",
	"run": "rn",
	"rus": "ru",
	"sag": "sg",
	"san": "sa",
	"sca": "hle",
	"scc": "sr",
	"scr": "hr",
	"sin": "si",
	"skk": "oyb",
	"slk": "sk",
	"slo": "sk",
	"slv": "sl",
	"sme": "se",
	"smo": "sm",
	"sna": "sn",
	"snd": "sd",
	"som": "so",
	"sot": "st",
	"spa": "es",
	"spy": "kln",
	"sqi": "sq",
	"src": "sc",
	"srd": "sc",
	"srp": "sr",
	"ssw": "ss",
	"sun": "su",
	"swa": "sw",
	"swe": "sv",
	"swh": "sw",
	"tah": "ty",
	"tam": "ta",
	"tat": "tt",
	"tdu": "dtp",
	"tel": "te",
	"tgk": "tg",
	"tgl": "fil",
	"tha": "th",
	"thc": "tpo",
	"thx": "oyb",
	"tib": "bo",
	"tie": "ras",
	"tir": "ti",
	"tkk": "twm",
	"tl": "fil",
	"tlw": "weo",
	"tmp": "tyj",
	"tne": "kak",
	"ton": "to",
	"tsf": "taj",
	"tsn": "tn",
	"tso": "ts",
	"ttq": "tmh",
	"tuk": "tk",
	"tur": "tr",
	"tw": "ak",
	"twi": "ak",
	"uig": "ug",
	"ukr": "uk",
	"umu": "del",
	"uok": "ema",
	"urd": "ur",
	"uzb": "uz",
	"uzn": "uz",
	"ven": "ve",
	"vie": "vi",
	"vol": "vo",
	"wel": "cy",
	"wln": "wa",
	"wol": "wo",
	"xba": "cax",
	"xho": "xh",
	"xia": "acn",
	"xkh": "waw",
	"xpe": "kpe",
	"xsj": "suj",
	"xsl": "den",
	"ybd": "rki",
	"ydd": "yi",
	"yid": "yi",
	"yma": "lrr",
	"ymt": "mtm",
	"yor": "yo",
	"yos": "zom",
	"yuu": "yug",
	"zai": "zap",
	"zha": "za",
	"zho": "zh",
	"zsm": "ms",
	"zul": "zu",
	"zyb": "za",
};


/**
 * Mappings from region subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __regionMappings = {
	// property names and values must be in canonical case

	"004": "AF",
	"008": "AL",
	"010": "AQ",
	"012": "DZ",
	"016": "AS",
	"020": "AD",
	"024": "AO",
	"028": "AG",
	"031": "AZ",
	"032": "AR",
	"036": "AU",
	"040": "AT",
	"044": "BS",
	"048": "BH",
	"050": "BD",
	"051": "AM",
	"052": "BB",
	"056": "BE",
	"060": "BM",
	"062": "034",
	"064": "BT",
	"068": "BO",
	"070": "BA",
	"072": "BW",
	"074": "BV",
	"076": "BR",
	"084": "BZ",
	"086": "IO",
	"090": "SB",
	"092": "VG",
	"096": "BN",
	"100": "BG",
	"104": "MM",
	"108": "BI",
	"112": "BY",
	"116": "KH",
	"120": "CM",
	"124": "CA",
	"132": "CV",
	"136": "KY",
	"140": "CF",
	"144": "LK",
	"148": "TD",
	"152": "CL",
	"156": "CN",
	"158": "TW",
	"162": "CX",
	"166": "CC",
	"170": "CO",
	"174": "KM",
	"175": "YT",
	"178": "CG",
	"180": "CD",
	"184": "CK",
	"188": "CR",
	"191": "HR",
	"192": "CU",
	"196": "CY",
	"203": "CZ",
	"204": "BJ",
	"208": "DK",
	"212": "DM",
	"214": "DO",
	"218": "EC",
	"222": "SV",
	"226": "GQ",
	"230": "ET",
	"231": "ET",
	"232": "ER",
	"233": "EE",
	"234": "FO",
	"238": "FK",
	"239": "GS",
	"242": "FJ",
	"246": "FI",
	"248": "AX",
	"249": "FR",
	"250": "FR",
	"254": "GF",
	"258": "PF",
	"260": "TF",
	"262": "DJ",
	"266": "GA",
	"268": "GE",
	"270": "GM",
	"275": "PS",
	"276": "DE",
	"278": "DE",
	"280": "DE",
	"288": "GH",
	"292": "GI",
	"296": "KI",
	"300": "GR",
	"304": "GL",
	"308": "GD",
	"312": "GP",
	"316": "GU",
	"320": "GT",
	"324": "GN",
	"328": "GY",
	"332": "HT",
	"334": "HM",
	"336": "VA",
	"340": "HN",
	"344": "HK",
	"348": "HU",
	"352": "IS",
	"356": "IN",
	"360": "ID",
	"364": "IR",
	"368": "IQ",
	"372": "IE",
	"376": "IL",
	"380": "IT",
	"384": "CI",
	"388": "JM",
	"392": "JP",
	"398": "KZ",
	"400": "JO",
	"404": "KE",
	"408": "KP",
	"410": "KR",
	"414": "KW",
	"417": "KG",
	"418": "LA",
	"422": "LB",
	"426": "LS",
	"428": "LV",
	"430": "LR",
	"434": "LY",
	"438": "LI",
	"440": "LT",
	"442": "LU",
	"446": "MO",
	"450": "MG",
	"454": "MW",
	"458": "MY",
	"462": "MV",
	"466": "ML",
	"470": "MT",
	"474": "MQ",
	"478": "MR",
	"480": "MU",
	"484": "MX",
	"492": "MC",
	"496": "MN",
	"498": "MD",
	"499": "ME",
	"500": "MS",
	"504": "MA",
	"508": "MZ",
	"512": "OM",
	"516": "NA",
	"520": "NR",
	"524": "NP",
	"528": "NL",
	"531": "CW",
	"533": "AW",
	"534": "SX",
	"535": "BQ",
	"540": "NC",
	"548": "VU",
	"554": "NZ",
	"558": "NI",
	"562": "NE",
	"566": "NG",
	"570": "NU",
	"574": "NF",
	"578": "NO",
	"580": "MP",
	"581": "UM",
	"583": "FM",
	"584": "MH",
	"585": "PW",
	"586": "PK",
	"591": "PA",
	"598": "PG",
	"600": "PY",
	"604": "PE",
	"608": "PH",
	"612": "PN",
	"616": "PL",
	"620": "PT",
	"624": "GW",
	"626": "TL",
	"630": "PR",
	"634": "QA",
	"638": "RE",
	"642": "RO",
	"643": "RU",
	"646": "RW",
	"652": "BL",
	"654": "SH",
	"659": "KN",
	"660": "AI",
	"662": "LC",
	"663": "MF",
	"666": "PM",
	"670": "VC",
	"674": "SM",
	"678": "ST",
	"682": "SA",
	"686": "SN",
	"688": "RS",
	"690": "SC",
	"694": "SL",
	"702": "SG",
	"703": "SK",
	"704": "VN",
	"705": "SI",
	"706": "SO",
	"710": "ZA",
	"716": "ZW",
	"720": "YE",
	"724": "ES",
	"728": "SS",
	"729": "SD",
	"732": "EH",
	"736": "SD",
	"740": "SR",
	"744": "SJ",
	"748": "SZ",
	"752": "SE",
	"756": "CH",
	"760": "SY",
	"762": "TJ",
	"764": "TH",
	"768": "TG",
	"772": "TK",
	"776": "TO",
	"780": "TT",
	"784": "AE",
	"788": "TN",
	"792": "TR",
	"795": "TM",
	"796": "TC",
	"798": "TV",
	"800": "UG",
	"804": "UA",
	"807": "MK",
	"818": "EG",
	"826": "GB",
	"830": "JE",
	"831": "GG",
	"832": "JE",
	"833": "IM",
	"834": "TZ",
	"840": "US",
	"850": "VI",
	"854": "BF",
	"858": "UY",
	"860": "UZ",
	"862": "VE",
	"876": "WF",
	"882": "WS",
	"886": "YE",
	"887": "YE",
	"891": "RS",
	"894": "ZM",
	"958": "AA",
	"959": "QM",
	"960": "QN",
	"962": "QP",
	"963": "QQ",
	"964": "QR",
	"965": "QS",
	"966": "QT",
	"967": "EU",
	"968": "QV",
	"969": "QW",
	"970": "QX",
	"971": "QY",
	"972": "QZ",
	"973": "XA",
	"974": "XB",
	"975": "XC",
	"976": "XD",
	"977": "XE",
	"978": "XF",
	"979": "XG",
	"980": "XH",
	"981": "XI",
	"982": "XJ",
	"983": "XK",
	"984": "XL",
	"985": "XM",
	"986": "XN",
	"987": "XO",
	"988": "XP",
	"989": "XQ",
	"990": "XR",
	"991": "XS",
	"992": "XT",
	"993": "XU",
	"994": "XV",
	"995": "XW",
	"996": "XX",
	"997": "XY",
	"998": "XZ",
	"999": "ZZ",
	"BU": "MM",
	"CS": "RS",
	"CT": "KI",
	"DD": "DE",
	"DY": "BJ",
	"FQ": "AQ",
	"FX": "FR",
	"HV": "BF",
	"JT": "UM",
	"MI": "UM",
	"NH": "VU",
	"NQ": "AQ",
	"PU": "UM",
	"PZ": "PA",
	"QU": "EU",
	"RH": "ZW",
	"TP": "TL",
	"UK": "GB",
	"VD": "VN",
	"WK": "UM",
	"YD": "YE",
	"YU": "RS",
	"ZR": "CD",
};


/**
 * Complex mappings from language subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __complexLanguageMappings = {
	// property names and values must be in canonical case

	"cnr": {language: "sr", region: "ME"},
	"drw": {language: "fa", region: "AF"},
	"hbs": {language: "sr", script: "Latn"},
	"prs": {language: "fa", region: "AF"},
	"sh": {language: "sr", script: "Latn"},
	"swc": {language: "sw", region: "CD"},
	"tnf": {language: "fa", region: "AF"},
};


/**
 * Complex mappings from region subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __complexRegionMappings = {
	// property names and values must be in canonical case

	"172": {
		default: "RU",
		"ab": "GE",
		"az": "AZ",
		"be": "BY",
		"crh": "UA",
		"gag": "MD",
		"got": "UA",
		"hy": "AM",
		"ji": "UA",
		"ka": "GE",
		"kaa": "UZ",
		"kk": "KZ",
		"ku-Yezi": "GE",
		"ky": "KG",
		"os": "GE",
		"rue": "UA",
		"sog": "UZ",
		"tg": "TJ",
		"tk": "TM",
		"tkr": "AZ",
		"tly": "AZ",
		"ttt": "AZ",
		"ug-Cyrl": "KZ",
		"uk": "UA",
		"und-Armn": "AM",
		"und-Chrs": "UZ",
		"und-Geor": "GE",
		"und-Goth": "UA",
		"und-Sogd": "UZ",
		"und-Sogo": "UZ",
		"und-Yezi": "GE",
		"uz": "UZ",
		"xco": "UZ",
		"xmf": "GE",
	},
	"200": {
		default: "CZ",
		"sk": "SK",
	},
	"530": {
		default: "CW",
		"vic": "SX",
	},
	"532": {
		default: "CW",
		"vic": "SX",
	},
	"536": {
		default: "SA",
		"akk": "IQ",
		"ckb": "IQ",
		"ku-Arab": "IQ",
		"mis": "IQ",
		"syr": "IQ",
		"und-Hatr": "IQ",
		"und-Syrc": "IQ",
		"und-Xsux": "IQ",
	},
	"582": {
		default: "FM",
		"mh": "MH",
		"pau": "PW",
	},
	"810": {
		default: "RU",
		"ab": "GE",
		"az": "AZ",
		"be": "BY",
		"crh": "UA",
		"et": "EE",
		"gag": "MD",
		"got": "UA",
		"hy": "AM",
		"ji": "UA",
		"ka": "GE",
		"kaa": "UZ",
		"kk": "KZ",
		"ku-Yezi": "GE",
		"ky": "KG",
		"lt": "LT",
		"ltg": "LV",
		"lv": "LV",
		"os": "GE",
		"rue": "UA",
		"sgs": "LT",
		"sog": "UZ",
		"tg": "TJ",
		"tk": "TM",
		"tkr": "AZ",
		"tly": "AZ",
		"ttt": "AZ",
		"ug-Cyrl": "KZ",
		"uk": "UA",
		"und-Armn": "AM",
		"und-Chrs": "UZ",
		"und-Geor": "GE",
		"und-Goth": "UA",
		"und-Sogd": "UZ",
		"und-Sogo": "UZ",
		"und-Yezi": "GE",
		"uz": "UZ",
		"vro": "EE",
		"xco": "UZ",
		"xmf": "GE",
	},
	"890": {
		default: "RS",
		"bs": "BA",
		"hr": "HR",
		"mk": "MK",
		"sl": "SI",
	},
	"AN": {
		default: "CW",
		"vic": "SX",
	},
	"NT": {
		default: "SA",
		"akk": "IQ",
		"ckb": "IQ",
		"ku-Arab": "IQ",
		"mis": "IQ",
		"syr": "IQ",
		"und-Hatr": "IQ",
		"und-Syrc": "IQ",
		"und-Xsux": "IQ",
	},
	"PC": {
		default: "FM",
		"mh": "MH",
		"pau": "PW",
	},
	"SU": {
		default: "RU",
		"ab": "GE",
		"az": "AZ",
		"be": "BY",
		"crh": "UA",
		"et": "EE",
		"gag": "MD",
		"got": "UA",
		"hy": "AM",
		"ji": "UA",
		"ka": "GE",
		"kaa": "UZ",
		"kk": "KZ",
		"ku-Yezi": "GE",
		"ky": "KG",
		"lt": "LT",
		"ltg": "LV",
		"lv": "LV",
		"os": "GE",
		"rue": "UA",
		"sgs": "LT",
		"sog": "UZ",
		"tg": "TJ",
		"tk": "TM",
		"tkr": "AZ",
		"tly": "AZ",
		"ttt": "AZ",
		"ug-Cyrl": "KZ",
		"uk": "UA",
		"und-Armn": "AM",
		"und-Chrs": "UZ",
		"und-Geor": "GE",
		"und-Goth": "UA",
		"und-Sogd": "UZ",
		"und-Sogo": "UZ",
		"und-Yezi": "GE",
		"uz": "UZ",
		"vro": "EE",
		"xco": "UZ",
		"xmf": "GE",
	},
};


/**
 * Mappings from variant subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __variantMappings = {
	// property names and values must be in canonical case

	"aaland": {type: "region", replacement: "AX"},
	"arevela": {type: "language", replacement: "hy"},
	"arevmda": {type: "language", replacement: "hyw"},
	"heploc": {type: "variant", replacement: "alalc97"},
	"polytoni": {type: "variant", replacement: "polyton"},
};


/**
 * Mappings from Unicode extension subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __unicodeMappings = {
	// property names and values must be in canonical case

	"ca": {
		"ethiopic-amete-alem": "ethioaa",
		"islamicc": "islamic-civil",
	},
	"kb": {
		"yes": "true",
	},
	"kc": {
		"yes": "true",
	},
	"kh": {
		"yes": "true",
	},
	"kk": {
		"yes": "true",
	},
	"kn": {
		"yes": "true",
	},
	"ks": {
		"primary": "level1",
		"tertiary": "level3",
	},
	"ms": {
		"imperial": "uksystem",
	},
	"rg": {
		"cn11": "cnbj",
		"cn12": "cntj",
		"cn13": "cnhe",
		"cn14": "cnsx",
		"cn15": "cnmn",
		"cn21": "cnln",
		"cn22": "cnjl",
		"cn23": "cnhl",
		"cn31": "cnsh",
		"cn32": "cnjs",
		"cn33": "cnzj",
		"cn34": "cnah",
		"cn35": "cnfj",
		"cn36": "cnjx",
		"cn37": "cnsd",
		"cn41": "cnha",
		"cn42": "cnhb",
		"cn43": "cnhn",
		"cn44": "cngd",
		"cn45": "cngx",
		"cn46": "cnhi",
		"cn50": "cncq",
		"cn51": "cnsc",
		"cn52": "cngz",
		"cn53": "cnyn",
		"cn54": "cnxz",
		"cn61": "cnsn",
		"cn62": "cngs",
		"cn63": "cnqh",
		"cn64": "cnnx",
		"cn65": "cnxj",
		"cz10a": "cz110",
		"cz10b": "cz111",
		"cz10c": "cz112",
		"cz10d": "cz113",
		"cz10e": "cz114",
		"cz10f": "cz115",
		"cz611": "cz663",
		"cz612": "cz632",
		"cz613": "cz633",
		"cz614": "cz634",
		"cz615": "cz635",
		"cz621": "cz641",
		"cz622": "cz642",
		"cz623": "cz643",
		"cz624": "cz644",
		"cz626": "cz646",
		"cz627": "cz647",
		"czjc": "cz31",
		"czjm": "cz64",
		"czka": "cz41",
		"czkr": "cz52",
		"czli": "cz51",
		"czmo": "cz80",
		"czol": "cz71",
		"czpa": "cz53",
		"czpl": "cz32",
		"czpr": "cz10",
		"czst": "cz20",
		"czus": "cz42",
		"czvy": "cz63",
		"czzl": "cz72",
		"fra": "frges",
		"frb": "frnaq",
		"frc": "frara",
		"frd": "frbfc",
		"fre": "frbre",
		"frf": "frcvl",
		"frg": "frges",
		"frh": "frcor",
		"fri": "frbfc",
		"frj": "fridf",
		"frk": "frocc",
		"frl": "frnaq",
		"frm": "frges",
		"frn": "frocc",
		"fro": "frhdf",
		"frp": "frnor",
		"frq": "frnor",
		"frr": "frpdl",
		"frs": "frhdf",
		"frt": "frnaq",
		"fru": "frpac",
		"frv": "frara",
		"laxn": "laxs",
		"lud": "lucl",
		"lug": "luec",
		"lul": "luca",
		"mrnkc": "mr13",
		"no23": "no50",
		"nzn": "nzauk",
		"nzs": "nzcan",
		"omba": "ombj",
		"omsh": "omsj",
		"plds": "pl02",
		"plkp": "pl04",
		"pllb": "pl08",
		"plld": "pl10",
		"pllu": "pl06",
		"plma": "pl12",
		"plmz": "pl14",
		"plop": "pl16",
		"plpd": "pl20",
		"plpk": "pl18",
		"plpm": "pl22",
		"plsk": "pl26",
		"plsl": "pl24",
		"plwn": "pl28",
		"plwp": "pl30",
		"plzp": "pl32",
		"tteto": "tttob",
		"ttrcm": "ttmrc",
		"ttwto": "tttob",
		"twkhq": "twkhh",
		"twtnq": "twtnn",
		"twtpq": "twnwt",
		"twtxq": "twtxg",
	},
	"sd": {
		"cn11": "cnbj",
		"cn12": "cntj",
		"cn13": "cnhe",
		"cn14": "cnsx",
		"cn15": "cnmn",
		"cn21": "cnln",
		"cn22": "cnjl",
		"cn23": "cnhl",
		"cn31": "cnsh",
		"cn32": "cnjs",
		"cn33": "cnzj",
		"cn34": "cnah",
		"cn35": "cnfj",
		"cn36": "cnjx",
		"cn37": "cnsd",
		"cn41": "cnha",
		"cn42": "cnhb",
		"cn43": "cnhn",
		"cn44": "cngd",
		"cn45": "cngx",
		"cn46": "cnhi",
		"cn50": "cncq",
		"cn51": "cnsc",
		"cn52": "cngz",
		"cn53": "cnyn",
		"cn54": "cnxz",
		"cn61": "cnsn",
		"cn62": "cngs",
		"cn63": "cnqh",
		"cn64": "cnnx",
		"cn65": "cnxj",
		"cz10a": "cz110",
		"cz10b": "cz111",
		"cz10c": "cz112",
		"cz10d": "cz113",
		"cz10e": "cz114",
		"cz10f": "cz115",
		"cz611": "cz663",
		"cz612": "cz632",
		"cz613": "cz633",
		"cz614": "cz634",
		"cz615": "cz635",
		"cz621": "cz641",
		"cz622": "cz642",
		"cz623": "cz643",
		"cz624": "cz644",
		"cz626": "cz646",
		"cz627": "cz647",
		"czjc": "cz31",
		"czjm": "cz64",
		"czka": "cz41",
		"czkr": "cz52",
		"czli": "cz51",
		"czmo": "cz80",
		"czol": "cz71",
		"czpa": "cz53",
		"czpl": "cz32",
		"czpr": "cz10",
		"czst": "cz20",
		"czus": "cz42",
		"czvy": "cz63",
		"czzl": "cz72",
		"fra": "frges",
		"frb": "frnaq",
		"frc": "frara",
		"frd": "frbfc",
		"fre": "frbre",
		"frf": "frcvl",
		"frg": "frges",
		"frh": "frcor",
		"fri": "frbfc",
		"frj": "fridf",
		"frk": "frocc",
		"frl": "frnaq",
		"frm": "frges",
		"frn": "frocc",
		"fro": "frhdf",
		"frp": "frnor",
		"frq": "frnor",
		"frr": "frpdl",
		"frs": "frhdf",
		"frt": "frnaq",
		"fru": "frpac",
		"frv": "frara",
		"laxn": "laxs",
		"lud": "lucl",
		"lug": "luec",
		"lul": "luca",
		"mrnkc": "mr13",
		"no23": "no50",
		"nzn": "nzauk",
		"nzs": "nzcan",
		"omba": "ombj",
		"omsh": "omsj",
		"plds": "pl02",
		"plkp": "pl04",
		"pllb": "pl08",
		"plld": "pl10",
		"pllu": "pl06",
		"plma": "pl12",
		"plmz": "pl14",
		"plop": "pl16",
		"plpd": "pl20",
		"plpk": "pl18",
		"plpm": "pl22",
		"plsk": "pl26",
		"plsl": "pl24",
		"plwn": "pl28",
		"plwp": "pl30",
		"plzp": "pl32",
		"tteto": "tttob",
		"ttrcm": "ttmrc",
		"ttwto": "tttob",
		"twkhq": "twkhh",
		"twtnq": "twtnn",
		"twtpq": "twnwt",
		"twtxq": "twtxg",
	},
	"tz": {
		"aqams": "nzakl",
		"cnckg": "cnsha",
		"cnhrb": "cnsha",
		"cnkhg": "cnurc",
		"cuba": "cuhav",
		"egypt": "egcai",
		"eire": "iedub",
		"est": "utcw05",
		"gmt0": "gmt",
		"hongkong": "hkhkg",
		"hst": "utcw10",
		"iceland": "isrey",
		"iran": "irthr",
		"israel": "jeruslm",
		"jamaica": "jmkin",
		"japan": "jptyo",
		"libya": "lytip",
		"mst": "utcw07",
		"navajo": "usden",
		"poland": "plwaw",
		"portugal": "ptlis",
		"prc": "cnsha",
		"roc": "twtpe",
		"rok": "krsel",
		"turkey": "trist",
		"uct": "utc",
		"usnavajo": "usden",
		"zulu": "utc",
	},
};


/**
 * Mappings from Unicode extension subtags to preferred values.
 *
 * Spec: http://unicode.org/reports/tr35/#Identifiers
 * Version: CLDR, version 36.1
 */
var __transformMappings = {
	// property names and values must be in canonical case

	"d0": {
		"name": "charname",
	},
	"m0": {
		"names": "prprname",
	},
};

/**
 * Canonicalizes the given well-formed BCP 47 language tag, including regularized case of subtags.
 *
 * Spec: ECMAScript Internationalization API Specification, draft, 6.2.3.
 * Spec: RFC 5646, section 4.5.
 */
function canonicalizeLanguageTag (locale) {

	// start with lower case for easier processing, and because most subtags will need to be lower case anyway
	locale = locale.toLowerCase();

	// handle mappings for complete tags
	if (__tagMappings.hasOwnProperty(locale)) {
		return __tagMappings[locale];
	}

	var subtags = locale.split("-");
	var i = 0;

	// handle standard part: all subtags before first variant or singleton subtag
	var language;
	var script;
	var region;
	while (i < subtags.length) {
		var subtag = subtags[i];
		if (i === 0) {
			language = subtag;
		} else if (subtag.length === 2 || subtag.length === 3) {
			region = subtag.toUpperCase();
		} else if (subtag.length === 4 && !("0" <= subtag[0] && subtag[0] <= "9")) {
			script = subtag[0].toUpperCase() + subtag.substring(1).toLowerCase();
		} else {
			break;
		}
		i++;
	}

	if (__languageMappings.hasOwnProperty(language)) {
		language = __languageMappings[language];
	} else if (__complexLanguageMappings.hasOwnProperty(language)) {
		var mapping = __complexLanguageMappings[language];

		language = mapping.language;
		if (script === undefined && mapping.hasOwnProperty("script")) {
			script = mapping.script;
		}
		if (region === undefined && mapping.hasOwnProperty("region")) {
			region = mapping.region;
		}
	}

	if (region !== undefined) {
		if (__regionMappings.hasOwnProperty(region)) {
			region = __regionMappings[region];
		} else if (__complexRegionMappings.hasOwnProperty(region)) {
			var mapping = __complexRegionMappings[region];

			var mappingKey = language;
			if (script !== undefined) {
				mappingKey += "-" + script;
			}

			if (mapping.hasOwnProperty(mappingKey)) {
				region = mapping[mappingKey];
			} else {
				region = mapping.default;
			}
		}
	}

	// handle variants
	var variants = [];
	while (i < subtags.length && subtags[i].length > 1) {
		var variant = subtags[i];

		if (__variantMappings.hasOwnProperty(variant)) {
			var mapping = __variantMappings[variant];
			switch (mapping.type) {
				case "language":
					language = mapping.replacement;
					break;

				case "region":
					region = mapping.replacement;
					break;

				case "variant":
					variants.push(mapping.replacement);
					break;

				default:
					throw new Error("illegal variant mapping type");
			}
		} else {
			variants.push(variant);
		}

		i += 1;
	}
	variants.sort();

	// handle extensions
	var extensions = [];
	while (i < subtags.length && subtags[i] !== "x") {
		var extensionStart = i;
		i++;
		while (i < subtags.length && subtags[i].length > 1) {
			i++;
		}

		var extension;
		var extensionKey = subtags[extensionStart];
		if (extensionKey === "u") {
			var j = extensionStart + 1;

			// skip over leading attributes
			while (j < i && subtags[j].length > 2) {
				j++;
			}

			extension = subtags.slice(extensionStart, j).join("-");

			while (j < i) {
				var keyStart = j;
				j++;

				while (j < i && subtags[j].length > 2) {
					j++;
				}

				var key = subtags[keyStart];
				var value = subtags.slice(keyStart + 1, j).join("-");

				if (__unicodeMappings.hasOwnProperty(key)) {
					var mapping = __unicodeMappings[key];
					if (mapping.hasOwnProperty(value)) {
						value = mapping[value];
					}
				}

				extension += "-" + key;
				if (value !== "" && value !== "true") {
					extension += "-" + value;
				}
			}
		} else if (extensionKey === "t") {
			var j = extensionStart + 1;

			while (j < i && !transformKeyRE.test(subtags[j])) {
				j++;
			}

			extension = "t";

			var transformLanguage = subtags.slice(extensionStart + 1, j).join("-");
			if (transformLanguage !== "") {
				extension += "-" + canonicalizeLanguageTag(transformLanguage).toLowerCase();
			}

			while (j < i) {
				var keyStart = j;
				j++;

				while (j < i && subtags[j].length > 2) {
					j++;
				}

				var key = subtags[keyStart];
				var value = subtags.slice(keyStart + 1, j).join("-");

				if (__transformMappings.hasOwnProperty(key)) {
					var mapping = __transformMappings[key];
					if (mapping.hasOwnProperty(value)) {
						value = mapping[value];
					}
				}

				extension += "-" + key + "-" + value;
			}
		} else {
			extension = subtags.slice(extensionStart, i).join("-");
		}

		extensions.push(extension);
	}
	extensions.sort();

	// handle private use
	var privateUse;
	if (i < subtags.length) {
		privateUse = subtags.slice(i).join("-");
	}

	// put everything back together
	var canonical = language;
	if (script !== undefined) {
		canonical += "-" + script;
	}
	if (region !== undefined) {
		canonical += "-" + region;
	}
	if (variants.length > 0) {
		canonical += "-" + variants.join("-");
	}
	if (extensions.length > 0) {
		canonical += "-" + extensions.join("-");
	}
	if (privateUse !== undefined) {
		if (canonical.length > 0) {
			canonical += "-" + privateUse;
		} else {
			canonical = privateUse;
		}
	}

	return canonical;
}


function isCanonicalizedStructurallyValidLanguageTag (locale) {
	return typeof locale === "string" && isStructurallyValidLanguageTag(locale) &&
		canonicalizeLanguageTag(locale) === locale;
}

console.log(canonicalizeLanguageTag("en-u-foo-bar-nu-thai-ca-buddhist-kk-true"));

/**
 * The CanonicalizeUnicodeLocaleId abstract operation returns the canonical and case-regularized
 * form of the locale argument (which must be a String value that is a structurally valid
 * Unicode BCP 47 locale identifier as verified by the IsStructurallyValidLanguageTag abstract operation).
 * https://www.ecma-international.org/ecma-402/7.0/index.html#sec-canonicalizeunicodelocaleid
 */
export function CanonicalizeUnicodeLocaleId (locale: string): void {
	// Let localeId be the string locale after performing the algorithm to
	// transform it to canonical syntax per Unicode Technical Standard #35 LDML § 3.2.1
	// Canonical Unicode Locale Identifiers. (The result is a Unicode BCP 47 locale identifier,
	// in canonical syntax but not necessarily in canonical form.)

}