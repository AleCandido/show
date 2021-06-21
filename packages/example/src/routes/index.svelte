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

<script charset="utf-8">
	import { onMount } from 'svelte';

	import Cover from '../slides/cover.md';

	export let data;

	let Reveal;
	let slides = [];
	let coverMeta = {};
	(async () => {
		coverMeta = (await import('../slides/cover.md')).metadata ?? {};
		slides = [];
		for (const slide of data) {
			let s = await import(`../slides/${slide.name}`);
            console.log(s, s.metadata);
            slides.push(s);
		}
	})().then(() => {
		slides = slides;
	});

	onMount(async () => {
        Reveal = (await import('../../node_modules/@annibale/show/Reveal.svelte')).default;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/reset.css" type="text/css" />
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/reveal.css" type="text/css" />
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/theme/sky.css" type="text/css" />
</svelte:head>

<div class="reveal">
	<div class="slides">
		<section><Cover {...coverMeta} /></section>
		{#each slides as slide}
			<section><svelte:component this={slide.default} /></section>
		{/each}
	</div>
</div>

<svelte:component this={Reveal} />
