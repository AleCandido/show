<script lang="ts">
  import { onMount, tick } from 'svelte';

  export let reveal = { plugins: [], hash: true };

  let Reveal;
  function loadReveal(configs: any) {
    // attempt to load reveal
    try {
      const deck = new Reveal(configs);
      deck.initialize();
    } catch (err) {
      // if the constructor has not yet been loaded, do nothing
    }
  }

  onMount(async () => {
    Reveal = (await import('reveal.js')).default;

    await tick();
    loadReveal(reveal);
  });

  // update reactively for lazy loaded plugins
  // and in general for any configs update
  $: loadReveal(reveal);

  // import default stylesheets
  import 'reveal.js/dist/reset.css';
  import 'reveal.js/dist/reveal.css';
</script>

<div class="reveal">
  <div class="slides">
    <slot />
  </div>
</div>
