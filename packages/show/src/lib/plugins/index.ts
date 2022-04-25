import type { Plugin } from 'reveal.js';

import imports from './imports';
import configs from './configs';

export default async function (...names: string[]): Promise<Plugin[]> {
  let plugins = [];

  for (const name of names) {
    const plugin = imports[name];

    plugins.push(await plugin());
  }

  return plugins;
}

export function defaultConfigs(...names: string[]) {
  let pluginsConfigs = {};

  for (const name of names) {
    pluginsConfigs[name] = configs[name]();
  }

  return pluginsConfigs;
}
