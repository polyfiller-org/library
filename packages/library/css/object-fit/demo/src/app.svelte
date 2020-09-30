<script lang="ts">
	import Example from "./example.svelte";
	import polyfillPkg from "../../package.json";
	import polyfillIcon from "../../documentation/asset/logo.svg";

	let objectFit = "cover";
	let objectPosition = "50% 50%";
	let width = "300px";
	let height = "200px";
	const unsupported = !("objectFit" in document.documentElement.style);

	const videos = [
		{ src: "./asset/horizontal.mp4" },
		{ src: "./asset/vertical.mp4" }
	];

	const images = [
		{ src: "./asset/horizontal.jpg" },
		{ src: "./asset/vertical.jpg" }
	];

	const responsiveImage = [
		{ src: "./asset/500x250.png", width: 500},
		{ src: "./asset/1000x500.png", width: 1000},
		{ src: "./asset/1500x750.png", width: 1500},
		{ src: "./asset/2000x1000.png", width: 2000}
	];
	const srcset = responsiveImage.map(({src, width}) => `${src} ${width}w`).join(",");

	$: videoExample = (src) => `\
<video
  src="${src}"
  style="object-fit: ${objectFit}; object-position: ${objectPosition}; width: ${width}; height: ${height}">
</video>`;

	$: imgExample = (src) => `\
<img
  src="${src}"
  style="object-fit: ${objectFit}; object-position: ${objectPosition}; width: ${width}; height: ${height}"
/>`;

		$: imgSrcsetExample = (srcset, fallback) => `\
<img
  src="${fallback}"
  srcset="${srcset}"
  style="object-fit: ${objectFit}; object-position: ${objectPosition}; width: ${width}; height: ${height}"
/>`;

	$: pictureExample = (srcset, fallback) => `\
<picture style="object-fit: ${objectFit}; object-position: ${objectPosition}; width: ${width}; height: ${height}">
  <source srcset="${srcset}" />
  <img src="${fallback}" />
</picture>`;

</script>

<style lang="scss">
	:global {
		@import "./style/global";
	}

	@import "./style/base";

	#options {
		display: flex;
		flex-direction: column;
		justify-content: center;

		> *:first-child {
			flex-grow: 1;
		}

		> * + * {
			margin-top: $spacing-m;
		}

		@media all and (min-width: 780px) {
			flex-direction: row;

			> * + * {
				margin-top: 0;
				margin-left: $spacing-l;
			}
		}
	}

	.faded {
		color: color(text, 50);
	}

	.card {
		box-shadow: $elevation-l;
		border-radius: $rounding-s;
		padding: $spacing-l;
		width: 100%;
		background: color(white, 80);

		+ .headline {
			margin-top: $spacing-l;
		}
	}

	.picture {
		display: inline-block;
	}

	.video, .img, .picture, .unsupported-overlay {
		border: size(1) dashed color(gray);
		max-width: 100%;
	}

	.picture .img {
		border: none;
	}

	*:not(.object-fit-label) + .object-fit-label {
		margin-top: $spacing-xs;
	}

	.object-fit-label {
		display: flex;
		align-items: center;
	}

	.media-container {
		position: relative;
		max-width: 100%;
	}

	.media-row {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: auto;
	}

	.unsupported-overlay {
		opacity: .6;
		color: color(black);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.polyfill-name-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		> img {
			width: size(50);
			height: size(50)
		}

		* + * {
			margin-left: $spacing-s;
		}
	}

	@media all and (min-width: 719px) {
		.media-container + .media-container {
			margin-left: $spacing-s;
		}

		.media-row {
			flex-direction: row;
			align-items: baseline;
		}
	}

</style>
<header id="header">
	<div class="polyfill-name-container">
		<img alt="Polyfill logo" src="{polyfillIcon}" />
		<p>
			This demo is running <a href="{polyfillPkg.homepage" target="_blank">{polyfillPkg.name} v{polyfillPkg.version}</a>
		</p>
	</div>
</header>
<h1 class="headline">Options</h1>
<section class="card">

	<form id="options">
		<aside class="aside">
			<label>
				<code>object-position</code>
				<input bind:value={objectPosition} />
			</label>

			<label>
				<code>width</code>
				<input bind:value={width} />
			</label>

			<label>
				<code>height</code>
				<input bind:value={height} />
			</label>
		</aside>
		<aside class="aside">
			<strong><code>object-fit</code></strong>

			<label class="object-fit-label">
				<input type=radio bind:group={objectFit} value={"contain"}>
				<code>contain</code>
			</label>

			<label class="object-fit-label">
				<input type=radio bind:group={objectFit} value={"cover"}>
				<code>cover</code>
			</label>

			<label class="object-fit-label">
				<input type=radio bind:group={objectFit} value={"fill"}>
				<code>fill</code>
			</label>

			<label class="object-fit-label">
				<input type=radio bind:group={objectFit} value={"none"}>
				<code>none</code>
			</label>

			<label class="object-fit-label">
				<input type=radio bind:group={objectFit} value={"scale-down"}>
				<code>scale-down</code>
			</label>
		</aside>
	</form>

</section>

<h1 class="headline"><code>&lt;video&gt;</code></h1>
<Example source="{videoExample('...')}" />
<section class="card">
	{#each videos as { src }, i}
		<h2 class="headline">Video {i + 1}</h2>
		<article class="media-row">
			<div class="media-container">
				{#if unsupported}
					<h4>Native <span class="faded">(unsupported)</span></h4>
				{:else}
					<h4>Native</h4>
				{/if}
				<video class="video" style="object-fit: {objectFit}; object-position: {objectPosition}; width: {width}; height: {height}" autoplay muted loop src="{src}" data-skip-object-fit-polyfill></video>
			</div>

			<div class="media-container">
				<h4>Polyfill</h4>
				<video class="video" data-object-fit="{objectFit}" data-object-position="{objectPosition}" style="width: {width}; height: {height}" autoplay muted loop src="{src}"></video>
			</div>
		</article>
	{/each}
</section>

<h1 class="headline"><code>&lt;img&gt;</code> with <code>&lt;src&gt;</code></h1>
<Example source="{imgExample('...')}" />

<section class="card">

	{#each images as { src }, i}
		<h1 class="headline">Image {i + 1}</h1>
		<article class="media-row">
			<div class="media-container">
				{#if unsupported}
					<h4>Native <span class="faded">(unsupported)</span></h4>
				{:else}
					<h4>Native</h4>
				{/if}
				<img class="img" alt="native" style="object-fit: {objectFit}; object-position: {objectPosition}; width: {width}; height: {height}" src="{src}" data-skip-object-fit-polyfill />
			</div>

			<div class="media-container">
				<h4>Polyfill</h4>
				<img class="img" alt="polyfill" data-object-fit="{objectFit}" data-object-position="{objectPosition}" style="width: {width}; height: {height}" src="{src}" />
			</div>
		</article>
	{/each}
</section>

<h1 class="headline"><code>&lt;img&gt;</code> with <code>&lt;srcset&gt;</code></h1>
<Example source="{imgSrcsetExample(srcset, '...')}" />

<section class="card">
	<p>Disable/clear the cache for this page if you want to see the image source change dynamically</p>

	<article class="media-row">
		<div class="media-container">
			{#if unsupported}
					<h4>Native <span class="faded">(unsupported)</span></h4>
				{:else}
					<h4>Native</h4>
				{/if}
			<img class="img" alt="Responsive (native)" style="object-fit: {objectFit}; object-position: {objectPosition}; width: {width}; height: {height}" src="{responsiveImage[responsiveImage.length - 1]?.src}" srcset="{srcset}" data-skip-object-fit-polyfill />
		</div>

		<div class="media-container">
			<h4>Polyfill</h4>
			<img class="img" alt="Responsive (polyfill)" data-object-fit="{objectFit}" data-object-position="{objectPosition}" style="width: {width}; height: {height}" src="{responsiveImage[responsiveImage.length - 1]?.src}" srcset="{srcset}" />
		</div>
	</article>
</section>

<h1 class="headline"><code>&lt;picture&gt;</code></h1>
<Example source="{pictureExample(srcset, '...')}" />

<section class="card">

	<article class="media-row">
		<div class="media-container">
			{#if unsupported}
					<h4>Native <span class="faded">(unsupported)</span></h4>
				{:else}
					<h4>Native</h4>
				{/if}
			<picture class="picture">
					<source srcset="{srcset}" />
					<img class="img" alt="Responsive" style="object-fit: {objectFit}; object-position: {objectPosition}; width: {width}; height: {height}" src="{responsiveImage[responsiveImage.length - 1]?.src}" data-skip-object-fit-polyfill />
				</picture>
		</div>

		<div class="media-container">
			<h4>Polyfill</h4>
			<picture class="picture">
				<source srcset="{srcset}" />
				<img class="img" alt="Responsive" data-object-fit="{objectFit}" data-object-position="{objectPosition}" style="width: {width}; height: {height}" src="{responsiveImage[responsiveImage.length - 1]?.src}" />
			</picture>
		</div>
	</article>
</section>