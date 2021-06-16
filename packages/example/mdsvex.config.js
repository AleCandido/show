export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		[
			{
				// Use your own repository
				repository: 'https://github.com/mvasigh/sveltekit-mdsvex-blog.git'
			}
		]
	]
};
