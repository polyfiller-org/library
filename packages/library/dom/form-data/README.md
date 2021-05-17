<!-- SHADOW_SECTION_LOGO_START -->

<div><img alt="Logo" src="https://raw.githubusercontent.com/polyfiller-org/polyfiller/master/packages/library/dom/form-data/documentation/asset/logo.png" height="250"   /></div>

<!-- SHADOW_SECTION_LOGO_END -->

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_START -->

> A robust polyfill for the 'FormData' interface

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_END -->

<!-- SHADOW_SECTION_BADGES_START -->

<a href="https://npmcharts.com/compare/%40polyfiller%2Fform-data?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/%40polyfiller%2Fform-data.svg"    /></a>
<a href="https://www.npmjs.com/package/%40polyfiller%2Fform-data"><img alt="NPM version" src="https://badge.fury.io/js/%40polyfiller%2Fform-data.svg"    /></a>
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

This is a robust, feature complete polyfill for the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) Web API that is accessible in Window or Worker contexts.
It differs from existing implementations in that by default, it won't replace the existing `FormData` constructor in browsers that support a subset of the API, such as IE 10 and IE 11.
This avoids having to patch other APIs such as `fetch` or `XmlHttpRequest` and makes it a seamless drop-in replacement.
 
<!-- SHADOW_SECTION_FEATURES_START -->

### Features

<!-- SHADOW_SECTION_FEATURES_END -->

- A seamless drop-in replacement.
- Only patches whatever holes are missing if FormData is already supported.
- Doesn't patch any other APIs.

<!-- SHADOW_SECTION_FEATURE_IMAGE_START -->

<!-- SHADOW_SECTION_FEATURE_IMAGE_END -->


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
- [Demo](#demo)
  - [Features](#features)
- [Table of Contents](#table-of-contents)
- [Install](#install)
  - [npm](#npm)
  - [Yarn](#yarn)
  - [pnpm](#pnpm)
- [Applying the polyfill](#applying-the-polyfill)
- [Usage](#usage)
- [Dependencies & Browser support](#dependencies--browser-support)
- [Maintainers](#maintainers)
- [Backers](#backers)
  - [Patreon](#patreon)
- [FAQ](#faq)
  - [What is the performance and reaction times of this polyfill?](#what-is-the-performance-and-reaction-times-of-this-polyfill)
- [License](#license)

<!-- SHADOW_SECTION_TOC_END -->

<!-- SHADOW_SECTION_INSTALL_START -->

## Install

### npm

```
$ npm install @polyfiller/form-data
```

### Yarn

```
$ yarn add @polyfiller/form-data
```

### pnpm

```
$ pnpm add @polyfiller/form-data
```

<!-- SHADOW_SECTION_INSTALL_END -->

## Applying the polyfill

The polyfill will check if the browser already supports `FormData` and will _only_ be applied if the runtime doesn't already support it.

To include it, add this somewhere in either a Window or Worker context:

```typescript
import "@polyfiller/form-data/polyfill";
```

However, it is generally a good idea that you only include the polyfill for runtimes that don't already support `FormData`.
One way to do so is with an async import:

```typescript
if (typeof FormData === "undefined") {
	await import("@polyfiller/form-data/polyfill");
}
```

Alternatively, you can use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only loading the polyfill if needed as well as adding the language features that the polyfill depends on (See [dependencies](#dependencies--browser-support)).

<!-- SHADOW_SECTION_USAGE_START -->

## Usage

<!-- SHADOW_SECTION_USAGE_END -->

This polyfill is a drop-in replacement, so you shouldn't have to update your code by any means.

## Dependencies & Browser support

This polyfill is distributed in ES5-compatible syntax, and will add features such as `Symbol.toStringTag` and `Symbol.iterator` depending on the availability
in the runtime. There are no hard dependencies below ES5.

Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

<!-- SHADOW_SECTION_MAINTAINERS_START -->

## Maintainers

| <a href="mailto:frederikwessberg@hotmail.com"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="70"   /></a>                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frederik Wessberg](mailto:frederikwessberg@hotmail.com)<br><strong>Twitter</strong>: [@FredWessberg](https://twitter.com/FredWessberg)<br><strong>Github</strong>: [@wessberg](https://github.com/wessberg)<br>_Lead Developer_ |

<!-- SHADOW_SECTION_MAINTAINERS_END -->

<!-- SHADOW_SECTION_FAQ_START -->

## FAQ

<!-- SHADOW_SECTION_FAQ_END -->

### Are there any known quirks?

If you load this polyfill In IE <=9 where there is no `FormData` constructor, and you add one or more `File` objects
as FormData, you will have to add some special handling for passing them as body to the request options when using `XmlHttpRequest` or a polyfilled
version of the `fetch` Api, as these do not natively support `FormData` in these browsers.

<!-- SHADOW_SECTION_LICENSE_START -->

## License

MIT © [Frederik Wessberg](mailto:frederikwessberg@hotmail.com) ([@FredWessberg](https://twitter.com/FredWessberg)) ([Website](https://github.com/wessberg))

<!-- SHADOW_SECTION_LICENSE_END -->

<!-- SHADOW_SECTION_CONTRIBUTING_START -->

<!-- SHADOW_SECTION_CONTRIBUTING_END -->
