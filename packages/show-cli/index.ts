import { program } from "commander";
import * as pkg from "./package.json";
import { new_, build, utils } from "./src";

async function run() {
  program.addCommand(new_()).addCommand(build()).addCommand(utils());
  program.version(pkg.version);

  program.parse(process.argv);
}

run();
