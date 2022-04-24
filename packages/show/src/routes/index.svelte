<script charset="utf-8" lang="ts">
  import { onMount } from 'svelte';

  import Reveal from '$lib/Reveal.svelte';
  import Highlight from '$lib/plugins/highlight';

  let reveal = {
    plugins: [],
    hash: true
  };

  onMount(async () => {
    reveal.plugins = reveal.plugins.concat(await Highlight());
  });

  import 'reveal.js/dist/theme/serif.css';
  import 'highlight.js/styles/nord.css';
</script>

<svelte:head>
  <title>Sandbox</title>
</svelte:head>

<Reveal {reveal}>
  <section>
    <h2>Slide 1</h2>
    <pre>
      <code data-trim data-noescape>
        (def lazy-fib
          (concat
          [0 1]
          ((fn rfib [a b]
                (lazy-cons (+ a b) (rfib b (+ a b)))) 0 1)))
      </code>
    </pre>
  </section>
  <section>
    <h2>Slide 2</h2>
  </section>
</Reveal>
