<!-- SHADOW_SECTION_LOGO_START -->

<div><img alt="Logo" src="https://raw.githubusercontent.com/polyfiller-org/polyfiller/master/packages/library/css/object-fit/documentation/asset/logo.png" height="250"   /></div>

<!-- SHADOW_SECTION_LOGO_END -->

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_START -->

> A robust polyfill for the 'object-fit' and 'object-position' CSS-properties

<!-- SHADOW_SECTION_DESCRIPTION_SHORT_END -->

<!-- SHADOW_SECTION_BADGES_START -->

<a href="https://npmcharts.com/compare/%40polyfiller%2Fobject-fit?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/%40polyfiller%2Fobject-fit.svg"    /></a>
<a href="https://www.npmjs.com/package/%40polyfiller%2Fobject-fit"><img alt="NPM version" src="https://badge.fury.io/js/%40polyfiller%2Fobject-fit.svg"    /></a>
<a href="https://david-dm.org/polyfiller-org/library"><img alt="Dependencies" src="https://img.shields.io/david/polyfiller-org%2Flibrary.svg"    /></a>
<a href="https://github.com/polyfiller-org/library/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/polyfiller-org%2Flibrary.svg"    /></a>
<a href="https://github.com/prettier/prettier"><img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"    /></a>
<a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"    /></a>
<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Support on Patreon" src="https://img.shields.io/badge/patreon-donate-green.svg"    /></a>

<!-- SHADOW_SECTION_BADGES_END -->

<!-- SHADOW_SECTION_DESCRIPTION_LONG_START -->

## Description

<!-- SHADOW_SECTION_DESCRIPTION_LONG_END -->

This is a robust, feature complete polyfill for the [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) and [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) CSS properties.
It differs from other similar solutions primarily in three areas: feature completeness, modern API support, and the ability to react to changes.

To see the polyfill in action, A [demo can be found here](https://object-fit.netlify.app).

<!-- SHADOW_SECTION_FEATURES_START -->

### Features

<!-- SHADOW_SECTION_FEATURES_END -->

- Supports not only images, but also videos, the picture element, as well as the `srcset` attribute.
- Supports Shadow DOM
- Reacts to changes, and updates calculated positions automatically.
- Leverages the browser's own scaling algorithms where possible
- Works seamlessly and automatically
- Works with the [`postcss-object-fit-images` plugin](https://github.com/ronik-design/postcss-object-fit-images)

<!-- SHADOW_SECTION_FEATURE_IMAGE_START -->

<!-- SHADOW_SECTION_FEATURE_IMAGE_END -->

<!-- SHADOW_SECTION_TOC_START -->

## Table of Contents

- [Description](#description)
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
$ npm install @polyfiller/object-fit
```

### Yarn

```
$ yarn add @polyfiller/object-fit
```

### pnpm

```
$ pnpm add @polyfiller/object-fit
```

<!-- SHADOW_SECTION_INSTALL_END -->

## Applying the polyfill

The polyfill will check if the browser already supports `object-fit` and `object-position` and will _only_ be applied if the runtime doesn't already support it.

To include it, add this somewhere:

```typescript
import "@polyfiller/object-fit/polyfill";
```

However, it is generally a good idea that you only include the polyfill for runtimes that don't already support `object-fit` and `object-position`.
One way to do so is with an async import:

```typescript
if (!("objectFit" in document.documentElement.style)) {
	await import("@polyfiller/object-fit/polyfill");
}
```

Alternatively, you can use [Polyfill.app](https://github.com/wessberg/Polyfiller) which uses this polyfill and takes care of only loading the polyfill if needed as well as adding the language features that the polyfill depends on (See [dependencies](#dependencies--browser-support)).

<!-- SHADOW_SECTION_USAGE_START -->

## Usage

<!-- SHADOW_SECTION_USAGE_END -->

You can provide `object-fit` and/or `object-position` values in one of more ways:

1. As part of the `style` attribute for an image:

```html
<img src="..." style="object-fit: contain" />
```

2. As part of a special `object-fit`, `object-position`, `data-object-fit`, or `data-object-position` attribute:

```html
<img src="..." object-fit="contain" />
<!-- or -->
<img src="..." data-object-fit="contain" />

<img src="..." object-position="50% 50%" />
<!-- or -->
<img src="..." data-object-position="50% 50%" />
```

3. Directly from CSS, using the `object-fit` and/or `object-position` properties, and a special `font-family` property that is used by browsers that doesn't natively support these features:

```css
img,
video {
	object-fit: cover;
	object-position: bottom;
	font-family: "object-fit: cover; object-position: bottom";
}
```

To generate the `font-family` automatically based on your CSS, you can use [this PostCSS plugin](https://github.com/ronik-design/postcss-object-fit-images).

## Dependencies & Browser support

This polyfill is distributed in ES5-compatible syntax, but is using some additional APIs and language features beyond ES5 which must be available in the runtime:

- `MutationObserver`
- `requestAnimationFrame`
- `Set`
- `WeakMap`
- `Symbol.iterator`
- `Symbol.toStringTag`

Generally, I would highly recommend using something like [Polyfill.app](https://github.com/wessberg/Polyfiller) which takes care of this stuff automatically.

<!-- SHADOW_SECTION_CONTRIBUTING_START -->

<!-- SHADOW_SECTION_CONTRIBUTING_END -->

<!-- SHADOW_SECTION_MAINTAINERS_START -->

## Maintainers

| <a href="mailto:frederikwessberg@hotmail.com"><img alt="Frederik Wessberg" src="https://avatars2.githubusercontent.com/u/20454213?s=460&v=4" height="70"   /></a>                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frederik Wessberg](mailto:frederikwessberg@hotmail.com)<br><strong>Twitter</strong>: [@FredWessberg](https://twitter.com/FredWessberg)<br><strong>Github</strong>: [@wessberg](https://github.com/wessberg)<br>_Lead Developer_ |

<!-- SHADOW_SECTION_MAINTAINERS_END -->

<!-- SHADOW_SECTION_BACKERS_START -->

## Backers

| <a href="https://usebubbles.com"><img alt="Bubbles" src="https://uploads-ssl.webflow.com/5d682047c28b217055606673/5e5360be16879c1d0dca6514_icon-thin-128x128%402x.png" height="70"   /></a> | <a href="https://github.com/cblanc"><img alt="Christopher Blanchard" src="https://avatars0.githubusercontent.com/u/2160685?s=400&v=4" height="70"   /></a> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Bubbles](https://usebubbles.com)<br><strong>Twitter</strong>: [@use_bubbles](https://twitter.com/use_bubbles)                                                                              | [Christopher Blanchard](https://github.com/cblanc)                                                                                                         |

### Patreon

<a href="https://www.patreon.com/bePatron?u=11315442"><img alt="Patrons on Patreon" src="https://img.shields.io/endpoint.svg?url=https://shieldsio-patreon.herokuapp.com/wessberg"  width="200"  /></a>

<!-- SHADOW_SECTION_BACKERS_END -->

<!-- SHADOW_SECTION_FAQ_START -->

## FAQ

<!-- SHADOW_SECTION_FAQ_END -->

### What is the performance and reaction times of this polyfill?

This polyfill observes various attributes on `<img>` and `<video>` elements such as `src`, `srcset`, `style`, and `class`, as well as the special `object-fit`, `data-object-fit`, `object-position`, and `data-object-position` attributes by leveraging `MutationObserver`. As such,
this is quite performant. Changing any of these attributes will immediately trigger repositioning of the fitted element(s). However, this polyfill also lazily recalculates the computed styles for fitted elements to see if their styles changed through cascaded styles. Getting the computed
styles for an element is somewhat expensive, and so this is done once every two seconds per fitted element. This means that an image/video may take up to two seconds to react to changes to styling. If you want it to react immediately, one way to force immediate repositioning is to provide a new value to the `style` attribute.

<!-- SHADOW_SECTION_LICENSE_START -->

## License

MIT © [Frederik Wessberg](mailto:frederikwessberg@hotmail.com) ([@FredWessberg](https://twitter.com/FredWessberg)) ([Website](https://github.com/wessberg))

<!-- SHADOW_SECTION_LICENSE_END -->
