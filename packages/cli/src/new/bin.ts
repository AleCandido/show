import fs from "fs";
import path from "path";
import process from "process";
import { bold, cyan, gray, green, red } from "kleur/colors";
import inquirer from "inquirer";
import prompts from "prompts";
import { mkdirp, copy } from "./utils";

// prettier-ignore
const disclaimer = `
${bold(cyan('Welcome to SvelteKit!'))}

${bold(red('This is beta software; expect bugs and missing features.'))}

If you encounter a problem, open an issue on ${cyan('https://github.com/sveltejs/kit/issues')} if none exists already.
`;

const version = process.env.npm_package_version;

export type Options = {
	template: "default" | "skeleton";
	typescript: boolean;
	prettier: boolean;
	eslint: boolean;
};

export default async (cwd: string) => {
	console.log(gray(`\ncreate-svelte version ${version}`));
	console.log(disclaimer);

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
	} else {
		mkdirp(cwd);
	}

	const options_usr = await prompts([
		{
			type: "toggle",
			name: "typescript",
			message: "Use TypeScript?",
			initial: false,
			active: "Yes",
			inactive: "No",
		},
		{
			type: "toggle",
			name: "eslint",
			message: "Add ESLint for code linting?",
			initial: false,
			active: "Yes",
			inactive: "No",
		},
		{
			type: "toggle",
			name: "prettier",
			message: "Add Prettier for code formatting?",
			initial: false,
			active: "Yes",
			inactive: "No",
		},
	]);
	const options: Options = { template: "skeleton", ...options_usr };

	const name = path.basename(path.resolve(cwd));

	write_template_files(options.template, options.typescript, name, cwd);
	write_common_files(cwd, options);

	console.log(bold(green("✔ Copied project files")));

	if (options.typescript) {
		console.log(
			bold(
				green(
					"✔ Added TypeScript support. " +
						'To use it inside Svelte components, add lang="ts" to the attributes of a script tag.'
				)
			)
		);
	}

	if (options.eslint) {
		console.log(
			bold(
				green(
					"✔ Added ESLint.\n" +
						"Readme for ESLint and Svelte: https://github.com/sveltejs/eslint-plugin-svelte3"
				)
			)
		);
	}

	if (options.prettier) {
		console.log(
			bold(
				green(
					"✔ Added Prettier.\n" +
						"General formatting options: https://prettier.io/docs/en/options.html\n" +
						"Svelte-specific formatting options: https://github.com/sveltejs/prettier-plugin-svelte#options"
				)
			)
		);
	}

	console.log(
		"\nWant to add other parts to your code base? " +
			"Visit https://github.com/svelte-add/svelte-adders, a community project of commands " +
			"to add particular functionality to Svelte projects\n"
	);

	console.log("\nNext steps:");
	let i = 1;

	const relative = path.relative(process.cwd(), cwd);
	if (relative !== "") {
		console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))}`);
	}

	console.log(`  ${i++}: ${bold(cyan("npm install"))} (or pnpm install, etc)`);
	// prettier-ignore
	console.log(`  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional step)`);
	console.log(`  ${i++}: ${bold(cyan("npm run dev -- --open"))}`);

	console.log(`\nTo close the dev server, hit ${bold(cyan("Ctrl-C"))}`);
	console.log("\nStuck? Visit us at https://svelte.dev/chat\n");
};
type Condition = "eslint" | "prettier" | "typescript" | "skeleton";
type FileEntry = {
	name: string;
	include: Condition[];
	exclude: Condition[];
	contents: string;
};

function write_template_files(
	template: string,
	typescript: boolean,
	name: string,
	cwd: string
) {
	const dir = dist(`templates/${template}`);
	copy(`${dir}/assets`, cwd, (name) => name.replace("gitignore", ".gitignore"));
	copy(`${dir}/package.json`, `${cwd}/package.json`);

	const manifest = `${dir}/files.${typescript ? "ts" : "js"}.json`;
	const files = /** @type {import('./types/internal').File[]} */ JSON.parse(
		fs.readFileSync(manifest, "utf-8")
	);

	files.forEach((file: FileEntry) => {
		const dest = path.join(cwd, file.name);
		mkdirp(path.dirname(dest));

		fs.writeFileSync(dest, file.contents.replace(/~TODO~/g, name));
	});
}

function write_common_files(cwd: string, options: Options) {
	const shared = dist("shared.json");
	const { files } = JSON.parse(fs.readFileSync(shared, "utf-8"));

	const pkg_file = path.join(cwd, "package.json");
	const pkg = JSON.parse(fs.readFileSync(pkg_file, "utf-8"));

	files.forEach((file: FileEntry) => {
		const include = file.include.every((condition: Condition) =>
			matchesCondition(condition, options)
		);
		const exclude = file.exclude.some((condition: Condition) =>
			matchesCondition(condition, options)
		);

		if (exclude || !include) return;

		if (file.name === "package.json") {
			const new_pkg = JSON.parse(file.contents);
			merge(pkg, new_pkg);
		} else {
			const dest = path.join(cwd, file.name);
			mkdirp(path.dirname(dest));
			fs.writeFileSync(dest, file.contents);
		}
	});

	pkg.dependencies = sort_keys(pkg.dependencies);
	pkg.devDependencies = sort_keys(pkg.devDependencies);

	fs.writeFileSync(pkg_file, JSON.stringify(pkg, null, "  "));
}

function matchesCondition(condition: Condition, options: Options): boolean {
	return condition === "skeleton"
		? options.template === condition
		: options[condition];
}

function merge(target: any, source: any) {
	for (const key in source) {
		if (key in target) {
			const target_value = target[key];
			const source_value = source[key];

			if (
				typeof source_value !== typeof target_value ||
				Array.isArray(source_value) !== Array.isArray(target_value)
			) {
				throw new Error("Mismatched values");
			}

			merge(target_value, source_value);
		} else {
			target[key] = source[key];
		}
	}
}

function sort_keys(obj: Record<string, any>) {
	if (!obj) return;

	const sorted: Record<string, any> = {};
	Object.keys(obj)
		.sort()
		.forEach((key) => {
			sorted[key] = obj[key];
		});

	return sorted;
}

function dist(filePath: string) {
	return path.join(
		path.dirname(require.resolve("create-svelte/bin")),
		`./dist/${filePath}`
	);
}
