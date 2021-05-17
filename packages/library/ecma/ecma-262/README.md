<!-- SHADOW_SECTION_LOGO_START -->

<div><img alt="Logo" src="https://raw.githubusercontent.com/polyfiller-org/polyfiller/master/packages/library/ecma/ecma-262/documentation/asset/logo.png" height="90"   /></div>

<!-- SHADOW_SECTION_LOGO_END -->

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_START -->

> An implementation of the ECMAScript® Language Specification

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_END -->

<!-- SHADOW_SECTION_BADGES_START -->

<a href="https://npmcharts.com/compare/%40polyfiller%2Fecma-262?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/%40polyfiller%2Fecma-262.svg"    /></a>
<a href="https://www.npmjs.com/package/%40polyfiller%2Fecma-262"><img alt="NPM version" src="https://badge.fury.io/js/%40polyfiller%2Fecma-262.svg"    /></a>
<a href="https://david-dm.org/polyfiller-org/library"><img alt="Dependencies" src="https://img.shields.io/david/polyfiller-org%2Flibrary.svg"    /></a>
<a href="https://github.com/polyfiller-org/library/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/polyfiller-org%2Flibrary.svg"    /></a>
<a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"    /></a>
<a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"    /></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://img.shields.io/badge/patreon-donate-green.svg"    /></a>

<!-- SHADOW_SECTION_BADGES_END -->

<div><img alt="Powered by Polyfiller" src="https://raw.githubusercontent.com/polyfiller-org/polyfiller/master/documentation/asset/logo-color-powered-by.png" height="50"   /></div>

<!-- SHADOW_SECTION_DESCRIPTION_LONG_START -->

## Description

<!-- SHADOW_SECTION_DESCRIPTION_LONG_END -->

This is a highly modularized, work-in-progress implementation of the [ECMAScript® Language Specification](https://tc39.github.io/ecma262/) written in TypeScript that can be used as a polyfill.
This library also exports an implementation of every [Abstract Operation](https://tc39.es/ecma262/#sec-abstract-operations) of the language that can be used as the foundation for other polyfills.
It is optimized for spec-compliance and aims for as close to 100% conformance with [Test262, the official ECMAScript test suite](https://github.com/tc39/test262) as possible.

<!-- SHADOW_SECTION_FEATURES_START -->

### Features

<!-- SHADOW_SECTION_FEATURES_END -->

- Fully spec-compliant
- Integrates directly with [Test262, the official ECMAScript Test Suite](https://github.com/tc39/test262)
- Highly modularized.
- Can be used as a suite of polyfills
- Can be used as a library exporting all [Abstract Operations](https://tc39.es/ecma262/#sec-abstract-operations) for use in other polyfills

<!-- SHADOW_SECTION_FEATURE_IMAGE_START -->

<!-- SHADOW_SECTION_FEATURE_IMAGE_END -->

## Disclaimer

This is a work in progress. Not every feature is yet fully implemented.


<!-- SHADOW_SECTION_BACKERS_START -->

## Backers

| <a href="https://usebubbles.com"><img alt="Bubbles" src="https://uploads-ssl.webflow.com/5d682047c28b217055606673/5e5360be16879c1d0dca6514_icon-thin-128x128%402x.png" height="70"   /></a> | <a href="https://github.com/cblanc"><img alt="Christopher Blanchard" src="https://avatars0.githubusercontent.com/u/2160685?s=400&v=4" height="70"   /></a> | <a href="https://github.com/ideal-postcodes"><img alt="Ideal Postcodes" src="https://avatars.githubusercontent.com/u/4996310?s=200&v=4" height="70"   /></a> | <a href="https://www.xerox.com"><img alt="Xerox" src="https://avatars.githubusercontent.com/u/9158512?s=200&v=4" height="70"   /></a> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Bubbles](https://usebubbles.com)<br><strong>Twitter</strong>: [@usebubbles](https://twitter.com/usebubbles)                                                                                | [Christopher Blanchard](https://github.com/cblanc)                                                                                                         | [Ideal Postcodes](https://github.com/ideal-postcodes)                                                                                                        | [Xerox](https://www.xerox.com)                                                                                                        |

### Patreon

<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Patrons on Patreon" src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dwessberg%26type%3Dpatrons"  width="200"  /></a>

<!-- SHADOW_SECTION_BACKERS_END -->

<!-- SHADOW_SECTION_TOC_START -->

## Table of Contents

- [Description](#description)
  - [Features](#features)
- [Disclaimer](#disclaimer)
- [Table of Contents](#table-of-contents)
- [Install](#install)
  - [npm](#npm)
  - [Yarn](#yarn)
  - [pnpm](#pnpm)
- [Applying the polyfills](#applying-the-polyfills)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Backers](#backers)
  - [Patreon](#patreon)
- [FAQ](#faq)
- [License](#license)

<!-- SHADOW_SECTION_TOC_END -->

<!-- SHADOW_SECTION_INSTALL_START -->

## Install

### npm

```
$ npm install @polyfiller/ecma-262
```

### Yarn

```
$ yarn add @polyfiller/ecma-262
```

### pnpm

```
$ pnpm add @polyfiller/ecma-262
```

<!-- SHADOW_SECTION_INSTALL_END -->

## Applying the polyfills

Applying one or more polyfills is as easy as adding imports for them.
Each polyfill will only be applied if the runtime doesn't already natively support the feature.
Everything is exported as modules. For example, if you want to polyfill `Symbol`, here's how you might do that:

```typescript
import "@polyfiller/ecma-262/polyfill/symbol";
```

You can get as granular as you want. For example, here's how to polyfill _only_ `Symbol.asyncIterator`:

```typescript
import "@polyfiller/ecma-262/polyfill/symbol.async-iterator";
```

However, it is generally a good idea that you only include the polyfill(s) for runtimes that doesn't already support the language features you want to support.
One way to do so if with dynamic imports:

```typescript
if (!("asyncIterator" in Symbol)) {
	await import("@polyfiller/ecma-262/polyfill/symbol.async-iterator");
}
```

If you want to polyfill the entire ECMAScript® Language, you can import it as such:

```typescript
import "@polyfiller/ecma-262/polyfill";
```

However, if you want to simply patch whatever holes there might be in the runtimes JavaScript support, you are _strongly_ encouraged to use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only including the language features that are actually needed by the runtime.
That approach will produce the most minimal overhead.

<!-- SHADOW_SECTION_USAGE_START -->

## Usage

<!-- SHADOW_SECTION_USAGE_END -->

This is not just a polyfill. This is an implementation of the ECMAScript language, written in TypeScript, and as such this library exposes all the constructs
found in the specification such as Abstract Operations and common algorithms. This might be useful to you, for example as the foundation for another polyfill.

To use it as a library, simply import what you want:

```typescript
// Import some Abstract Operations
import {ToInt32, CreateDataProperty, GetMethod} from "@polyfiller/ecma-262";
```

You can also use this approach to import implementations of language features for testing or to use as a _ponyfill_:

```typescript
import {arrayPrototypeFlat as flat} from "@polyfiller/ecma-262";
flat.call([[[1]]], Infinity);
```

Beyond that, you also have access to all [Well-Known Intrinsic Objects](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects), as
well as the [current Realm](https://tc39.es/ecma262/#realm):

```typescript
import {getCurrentRealmRecord, getCurrentIntrinsics} from "@polyfiller/ecma-262";
```

<!-- SHADOW_SECTION_MAINTAINERS_START -->

## Maintainers

| <a href="mailto:frederikwessberg@hotmail.com"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="70"   /></a>                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frederik Wessberg](mailto:frederikwessberg@hotmail.com)<br><strong>Twitter</strong>: [@FredWessberg](https://twitter.com/FredWessberg)<br><strong>Github</strong>: [@wessberg](https://github.com/wessberg)<br>_Lead Developer_ |

<!-- SHADOW_SECTION_MAINTAINERS_END -->

<!-- SHADOW_SECTION_FAQ_START -->

## FAQ

<!-- SHADOW_SECTION_FAQ_END -->

<!-- SHADOW_SECTION_LICENSE_START -->

## License

MIT © [Frederik Wessberg](mailto:frederikwessberg@hotmail.com) ([@FredWessberg](https://twitter.com/FredWessberg)) ([Website](https://github.com/wessberg))

<!-- SHADOW_SECTION_LICENSE_END -->

<!-- SHADOW_SECTION_CONTRIBUTING_START -->

<!-- SHADOW_SECTION_CONTRIBUTING_END -->
