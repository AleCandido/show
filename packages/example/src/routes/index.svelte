<script charset="utf-8">
	import { onMount } from 'svelte';
	let Reveal;
	onMount(async () => {
		Reveal = (await import('../../node_modules/@annibale/show/Reveal.svelte')).default;
	});
    import S1 from '../slides/1.md';
    import S2 from '../slides/2.md';
    import { metadata } from '../slides/2.md';
    console.log(metadata);
</script>

<svelte:head>
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/reset.css" type="text/css" />
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/reveal.css" type="text/css" />
	<link rel="stylesheet" href="../../node_modules/reveal.js/dist/theme/sky.css" type="text/css" />
</svelte:head>

<div class="reveal">
	<div class="slides">
        <section><S1/></section>
        <section><S2/></section>
	</div>
</div>


<svelte:component this={Reveal} />


