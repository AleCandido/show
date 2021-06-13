import { Command } from "commander";
import outdent from "outdent";
import interact from "./interact";

export default function makeNewCommand() {
  const new_ = new Command("new");

  new_.arguments("<name>");
  new_.description("create new presentation", {
    name: outdent`
      name of the folder to be created (applied as default presentation name,
      later customizable)
    `,
  });
  new_.action(interact);

  return new_;
}
