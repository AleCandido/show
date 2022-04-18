In order to install in development do:

```sh
pnpm install
cd packages/cli
pnpm build
pnpm link .
```

And to run (from inside `cli` folder):

```sh
pnpm cli -- <options>
```

E.g., for testing creation of a new project:

```sh
rm -rf <name> && pnpm cli -- new <name>
```
