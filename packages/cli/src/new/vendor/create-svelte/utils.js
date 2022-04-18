import fs from "fs";
import path from "path";

/** @param {string} dir */
export function mkdirp(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e instanceof Object && "code" in e && e["code"] === "EEXIST") return;
    throw e;
  }
}

/** @param {string} path */
export function rimraf(path) {
  (fs.rmSync || fs.rmdirSync)(path, { recursive: true, force: true });
}

/**
 * @template T
 * @param {T} x
 */
function identity(x) {
  return x;
}

/**
 * @param {string} from
 * @param {string} to
 * @param {(basename: string) => string} rename
 */
export function copy(from, to, rename = identity) {
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

/** @param {string} filePath */
export function dist(filePath) {
  console.log(filePath);
  return path.join(
    path.dirname(require.resolve("create-svelte/bin")),
    `./dist/${filePath}`
  );
}
