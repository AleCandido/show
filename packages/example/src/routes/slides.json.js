import { basename } from "path";

export async function get() {
  const modules = import.meta.glob("../slides/*.{md,svx,svelte.md}");

  const slidesPromises = [];

  for (let [path, resolver] of Object.entries(modules)) {
    const name = basename(path);

    const num = Number(name.split(".")[0]);
    if (Number.isNaN(num)) {
      continue;
    }

    const promise = resolver().then((slide) => {
      return {
        name,
        num,
        metadata: slide.metadata,
      };
    });

    slidesPromises.push(promise);
  }

  let slides = await Promise.all(slidesPromises);

  slides.sort((a, b) => a.num - b.num);

  return { body: slides };
}
