#!/usr/bin/env node

import { program } from "commander";
// import * as pkg from "../package.json";
import process from "process";
import { new_, build, utils } from "./";

async function run() {
  program.addCommand(new_()).addCommand(build()).addCommand(utils());
  program.version(process.env.npm_package_version!);

  program.parse(process.argv);
}

run();
