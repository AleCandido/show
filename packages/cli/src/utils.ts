import { Command } from "commander";
import showUtils from "@slideshow/utils";

export default () => {
  const utils = new Command("utils");

  utils.description("access to command line extra utilities");

  for (const cmd of showUtils) {
    utils.addCommand(cmd());
  }

  return utils;
};
