import inquirer from "inquirer";
import run from "./run";

export default async (name: string, options: object, command: object) => {
  console.log("name", typeof name, name);
  console.log("options", typeof options, options);
  console.log("command", typeof command);

  const questions = [];
  questions.push({
    type: "list",
    name: "template",
    message: "Ciao, come va?",
    choices: ["Bene", "Male"],
    default: "Bene",
  });

  const answers = await inquirer.prompt(questions);

  console.log(answers);
  run(name);
};
