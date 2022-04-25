<script charset="utf-8" lang="ts">
  import { onMount } from 'svelte';

  import Reveal from '$lib/Reveal.svelte';
  import loadPlugins from '$lib/plugins';
  import type {Plugin} from 'reveal.js';

  let configs = {};
  let plugins: Plugin[] = [];

  onMount(async () => {
    plugins = plugins.concat(await loadPlugins('highlight', 'zoom'));
  });

  import 'reveal.js/dist/theme/serif.css';
  import 'highlight.js/styles/github.css';
</script>

<svelte:head>
  <title>Sandbox</title>
</svelte:head>

<Reveal {configs} {plugins}>
  <section>
    <h1>Cover</h1>
  </section>
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
</Reveal>
