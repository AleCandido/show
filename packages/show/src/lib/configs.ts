import structuredClone from '@ungap/structured-clone';
import type { RevealOptions } from 'reveal.js';

const configs: RevealOptions = {
  plugins: [],
  hash: true
};

export default function () {
  return structuredClone(configs);
}
