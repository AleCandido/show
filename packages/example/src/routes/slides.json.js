import { basename } from 'path';

export async function get({ query }) {
	const modules = import.meta.glob('../slides/*.{md,svx,svelte.md}');

	const postPromises = [];
	// const limit = Number(query.get('limit') ?? Infinity);

	// if (Number.isNaN(limit)) {
	// return {
	// status: 400
	// };
	// }

	for (let [path, resolver] of Object.entries(modules)) {
		const name = basename(path);
		const promise = resolver().then((post) => {
			// console.log(post.default);
			return {
				name,
				metadata: post.metadata
			};
		});

		postPromises.push(promise);
	}

	const slides = await Promise.all(postPromises);
	// const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	// publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return {
		body: slides
	};
}
