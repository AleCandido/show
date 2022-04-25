import { klona } from 'klona';
import type { RevealOptions } from 'reveal.js';

const configs: RevealOptions = {
  plugins: [],
  hash: true
};

export default function () {
  return klona(configs);
}
