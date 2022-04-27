<script charset="utf-8" context="module">
  export async function load({ fetch }) {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    const data = await fetch('/slides.json').then((res) => res.json());
    return {
      props: {
        data
      }
    };
  }
</script>

<script charset="utf-8" lang="ts">
  import { onMount } from 'svelte';

  import Reveal from "@slideshow/show/Reveal.svelte";
  import loadPlugins from '@slideshow/show/plugins';
  import type { Plugin } from 'reveal.js';

  let configs = {};
  let plugins: Plugin[] = [];

  onMount(async () => {
    plugins = plugins.concat(await loadPlugins('highlight', 'zoom'));
  });


  /* import Cover from '../slides/cover.md'; */

  /* export let data; */

  /* let slides = []; */
  /* let coverMeta = {}; */
  /* (async () => { */
    /* coverMeta = (await import('../slides/cover.md')).metadata ?? {}; */
    /* slides = []; */
    /* for (const slide of data) { */
      /* let s = await import(`../slides/${slide.name}`); */
            /* console.log(s, s.metadata); */
            /* slides.push(s); */
    /* } */
  /* })().then(() => { */
    /* slides = slides; */
  /* }); */

  import 'reveal.js/dist/theme/moon.css';
  /* import 'highlight.js/styles/sunburst.css'; */
  import 'highlight.js/styles/pojoaque.css';
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

<!--
<Reveal>
  <section><Cover {...coverMeta} /></section>
  {#each slides as slide}
    <section><svelte:component this={slide.default} /></section>
  {/each}
</Reveal>
-->
