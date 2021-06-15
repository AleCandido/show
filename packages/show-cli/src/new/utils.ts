import fs from "fs";
import path from "path";

export function mkdirp(dir: string) {
	try {
		fs.mkdirSync(dir, { recursive: true });
	} catch (e) {
		if (e.code === "EEXIST") return;
		throw e;
	}
}

export function rimraf(path: string) {
	(fs.rmSync || fs.rmdirSync)(path, { recursive: true, force: true });
}

function identity<T>(x: T): T {
	return x;
}

export function copy(
	from: string,
	to: string,
	rename: (basename: string) => string = identity
) {
	if (!fs.existsSync(from)) return;

	const stats = fs.statSync(from);

	if (stats.isDirectory()) {
		fs.readdirSync(from).forEach((file) => {
			copy(path.join(from, file), path.join(to, rename(file)));
		});
	} else {
		mkdirp(path.dirname(to));
		fs.copyFileSync(from, to);
	}
}
