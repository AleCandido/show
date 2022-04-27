<script charset="utf-8" context="module" lang="ts">
  export async function load({ fetch }) {
    const data = await fetch('/slides.json').then((res: Body) => res.json());
    return { props: { data } };
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

  import Cover from '../slides/cover.md';

  export let data;

  let slides = [];
  (async () => {
    slides = [];
    for (const slide of data) {
      let s = await import(`../slides/${slide.name}`);
            slides.push(s);
    }
  })().then(() => {
    // just for to trigger the reactive update
    slides = slides;
  });

  import 'reveal.js/dist/theme/moon.css';
  import 'highlight.js/styles/pojoaque.css';
</script>

<svelte:head>
  <title>Sandbox</title>
</svelte:head>

<Reveal {configs} {plugins}>
  <section><Cover /></section>
  {#each slides as slide}
    <section><svelte:component this={slide.default} /></section>
  {/each}
</Reveal>
