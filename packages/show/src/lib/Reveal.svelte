<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Plugin, RevealOptions, RevealStatic } from 'reveal.js';
  import defaultConfigs from './configs';

  // user specified configs
  export let configs: RevealOptions = {};
  // user loaded plugins
  export let plugins: Plugin[] = [];

  // global reveal instance
  let reveal: RevealStatic;
  // actual configs used, initialized to default
  let fullConfigs: RevealOptions = defaultConfigs();

  /**
   * reinitialize reveal
   *
   * reinitialization is needed in order to load plugins, for any other
   * configuration a simpler `reveal.configure(configs)` is enough -> use
   * `reconf`
   */
  function reinit(plugins: Plugin[]) {
    fullConfigs.plugins = plugins;
    try {
      // only perform if reveal has been created
      reveal.initialize(fullConfigs);
    } catch (err) {}
  }

  /**
   *reconfigure reveal
   */
  function reconf(configs: RevealOptions) {
    try {
      // only perform if reveal has been created
      reveal.configure(configs);
    } catch (err) {}
  }

  onMount(async () => {
    const Reveal = (await import('reveal.js')).default;

    await tick();

    reveal = new Reveal(configs);
    reveal.initialize();
  });

  // update reactively for lazy loaded plugins
  $: reinit(plugins);
  // and in general for any configs update
  fullConfigs = Object.assign(fullConfigs, configs);
  $: reconf(fullConfigs);

  // import default stylesheets
  import 'reveal.js/dist/reset.css';
  import 'reveal.js/dist/reveal.css';
</script>

<div class="reveal">
  <div class="slides">
    <slot />
  </div>
</div>
