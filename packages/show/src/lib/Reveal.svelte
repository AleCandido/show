<script lang="ts">
  import { onMount, tick } from 'svelte';
  /* import Reveal from 'reveal.js'; */

  let reveal = {
    /* plugins: [Highlight], */
    hash: true
  };

  onMount(async () => {
    let Reveal = (await import('reveal.js')).default;

    await tick();
    const deck = new Reveal(reveal);
    deck.initialize();
  });

  import 'reveal.js/dist/reset.css';
  import 'reveal.js/dist/reveal.css';
</script>

<div class="reveal">
  <div class="slides">
    <slot />
  </div>
</div>
