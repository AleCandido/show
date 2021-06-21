<script context="module">
	export async function load({ fetch }) {
		const posts = await fetch('/posts.json?limit=5').then((res) => res.json());

		return {
			props: {
				posts
			}
		};
	}
</script>

<script>
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';

	export let posts;
</script>

<p>
	This is a minimalistic example of a blog built with <a href="https://kit.svelte.dev">SvelteKit</a>
	and <a href="https://mdsvex.com/">MDsveX</a>.
	<a href="https://github.com/mvasigh/sveltekit-mdsvex-blog">View source code on Github.</a>
</p>

{#each posts as { slug, title, author, description, date }}
	<ArticleTitle {slug} {title} />
{/each}

<slot />
