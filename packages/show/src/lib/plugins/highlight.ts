export default async function () {
  let Highlight = (await import('reveal.js/plugin/highlight/highlight')).default;

  return Highlight;
}
