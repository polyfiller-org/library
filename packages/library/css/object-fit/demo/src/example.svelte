<script lang="ts">
	import {el} from "lolight";

	export let source = "";
	let formattedSource = source;

	$: source && createHighlightedElement()
  function createHighlightedElement () {
	  const wrapper = document.createElement("div");
	  wrapper.textContent = source;
	  el(wrapper);
	  formattedSource = wrapper.outerHTML;
  }

</script>

<style lang="scss">
  @import "./style/base";
  #container {
    border-radius: $rounding-s;
    padding: $spacing-m;
    box-shadow: $elevation-m;
    margin: auto 0 $spacing-m auto;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background: color(white, 70);
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  }

  :global {
    .ll-nam { /* words */
      color: color(accent);
    }
    .ll-str { /* strings */
      color: color(primary);
    }
  }
</style>

<pre id="container">
  {@html formattedSource}
</pre>