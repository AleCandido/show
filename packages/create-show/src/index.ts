#!/usr/bin/env node

import { program } from "commander";
import { new_ } from "@slideshow/cli";
import process from "process";

console.log(process.argv);
process.argv.splice(2, 0, "new");
console.log(process.argv);

async function main() {
  program.addCommand(new_());
  program.version(process.env.npm_package_version!);

  program.parse(process.argv);
}

main();
