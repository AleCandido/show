import fs from "fs";
import path from "path";
import process from "process";
import { bold, italic, cyan, gray, green, yellow, magenta } from "kleur/colors";
import prompts from "prompts";
import { create } from "./vendor/create-svelte/index";
import { Options } from "./vendor/create-svelte/types/internal";

// prettier-ignore
const disclaimer = `
${bold(cyan('Welcome to Show!'))}

${bold(yellow('This software depends on SvelteKit, that is currently in beta.'))}

If you encounter a problem, check:
- ${italic(magenta('https://github.com/AleCandido/show/issues'))}
- ${italic(magenta('https://github.com/sveltejs/kit/issues'))}
`;

const version = process.env.npm_package_version;

export default async (options: Options) => {
  console.log(gray(`\ncreate-show version ${version}`));
  console.log(disclaimer);

  const cwd = options.name;

  if (fs.existsSync(cwd)) {
    if (fs.readdirSync(cwd).length > 0) {
      const response = await prompts({
        type: "confirm",
        name: "value",
        message: "Directory not empty. Continue?",
        initial: false,
      });

      if (!response.value) {
        process.exit(1);
      }
    }
  }

  const name = path.basename(path.resolve(cwd));

  await create(cwd, options);

  console.log(bold(green("✔ Copied project files")));

  console.log(bold(green("\nYour project is ready!")));

  if (options.typescript) {
    console.log(bold("✔ Typescript"));
    console.log('  Inside Svelte components, use <script lang="ts">');
  }

  if (options.eslint) {
    console.log(bold("✔ ESLint"));
    console.log(cyan("  https://github.com/sveltejs/eslint-plugin-svelte3"));
  }

  if (options.prettier) {
    console.log(bold("✔ Prettier"));
    console.log(cyan("  https://prettier.io/docs/en/options.html"));
    console.log(
      cyan("  https://github.com/sveltejs/prettier-plugin-svelte#options")
    );
  }

  if (options.playwright) {
    console.log(bold("✔ Playwright"));
    console.log(cyan("  https://playwright.dev"));
  }

  console.log("\nNext steps:");
  let i = 1;

  const relative = path.relative(process.cwd(), cwd);
  if (relative !== "") {
    console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))}`);
  }

  console.log(`  ${i++}: ${bold(cyan("npm install"))} (or pnpm install, etc)`);
  // prettier-ignore
  console.log(`  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`);
  console.log(`  ${i++}: ${bold(cyan("npm run dev -- --open"))}`);

  console.log(`\nTo close the dev server, hit ${bold(cyan("Ctrl-C"))}`);
};
