import { Command } from "commander";

export default function makeBuildCommand() {
  const build = new Command("build");
  build.option("-f, --force", "overwrite existing build");
  build.option(
    "-d, --destination",
    "specify destination folder (default: 'build')"
  );

  return build;
}
