# Packages

Packages goals summary:

- `show`: here is the main library, containing the components for making
  presentations
- `cli`: here is the code used to create and manage a `show` project
- `create-show`: just an easy way to get started
  - makes use of primitives inside the `cli`
- `utils`: extra utilities to write presentations
  - no front-end, just API

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

In general, it should not be required for a very plain project, with manual
export, but only for extra chores (`export`, `clipng`, ...).

### New

Add a top-level configuration file, do not add further configurations to an
existing file (like `svelte.config.js`), not even `package.json`:

- it's the most popular JS style
- it does not prevent anything else to work properly

### Export

Bundled folder:

- make sure to use `adapter-static`

## `utils`

This will be populated by stuffs like `clipng`, randomly created for specific
goals.

It will provide only JS/TS API.

If a front-end is needed (and it is), the package will be a dependency of `cli`,
that will provide a suitable subcommand access.
