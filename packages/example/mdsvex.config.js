import remarkAbbr from "remark-abbr";
import remarkBreaks from "remark-breaks";
import remarkGFM from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool",
  },
  remarkPlugins: [remarkAbbr, remarkBreaks, remarkGFM],
  rehypePlugins: [
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
      },
    ],
    rehypeSlug,
  ],
};
