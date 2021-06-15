import * as child from "child_process";

export default async (name: string) => {
  child.fork(require.resolve("create-svelte/bin"), [name]);
};
