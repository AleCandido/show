# Packages

Packages goals summary:

- `show`: here is the main library, containing the components for making
  presentations
- `cli`: here is the code used to create and manage a `show` project
- `create-show`: just an easy way to get started
  - makes use of primitives inside the `cli`

## `show`

## `cli`

All the commands going to be implemented:

- `new`: bootstrap a new `show` project
  - make use of `create-svelte` to make a `kit` project
  - `kit` layout is plainly exposed: if anyone wants to customize, it will be
    allowed to do it in the exact same way of a plain `kit` project
  - extend the `kit` skeleton template, adding primitives
- `export`: to export stand-alone double-click ready presentations
  - fully bundled folder
  - PDF

For all the developments commands, use directly `kit` ones through
`npm`/`yarn`/`pnpm`.

### New

Add a top-level configuration file, do not add further configurations to an
existing file (like `svelte.config.js`), not even `package.json`:

- it's the most popular JS style
- it does not prevent anything else to work properly

### Export

Bundled folder:

- make sure to use `adapter-static`
