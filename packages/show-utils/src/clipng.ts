import { Command } from "commander";
import outdent from "outdent";

export default () => {
  const clipng = new Command("clipng");

  clipng
    .arguments("<name>")
    .option("-u, --data-url", "use clipboard content as Image Data-URL");

  clipng.description("dump picture from clipboard on file", {
    name: outdent`
      the name for the file to dump (if not present '.png' extension is used)
    `,
  });

  return clipng;
};
