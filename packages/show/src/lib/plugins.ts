import type { Plugin } from 'reveal.js';

export default async function (...names: string[]): Promise<Plugin[]> {
  let plugins = [];

  for (const name of names) {
    const plugin = eval(name);

    plugins.push(await plugin());
  }

  return plugins;
}

export async function highlight() {
  let Highlight = (await import('reveal.js/plugin/highlight/highlight.esm')).default;

  return Highlight;
}

export async function notes() {
  let SpeakerNotes = (await import('reveal.js/plugin/notes/notes.esm')).default;

  return SpeakerNotes;
}

export async function search() {
  let Search = (await import('reveal.js/plugin/search/search.esm')).default;

  return Search;
}

export async function zoom() {
  let Zoom = (await import('reveal.js/plugin/zoom/zoom.esm')).default;

  return Zoom;
}
