<script charset="utf-8">
	import { onMount } from 'svelte';
	let Reveal;
    /* let slides = []; */
    let slide;
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
		<section>Slide 1</section>
		<section>Slide 2</section>
	</div>
</div>


<svelte:component this={Reveal} />
