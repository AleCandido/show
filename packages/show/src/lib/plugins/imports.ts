//built-in plugins

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

//extra plugins

export async function customcontrols() {
  await import('reveal.js-plugins/customcontrols/plugin');

  return window.RevealCustomControls;
}

export async function chalkboard() {
  await import('reveal.js-plugins/chalkboard/plugin');

  return window.RevealChalkboard;
}

export default { highlight, notes, search, zoom, customcontrols, chalkboard };
