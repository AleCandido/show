import inquirer from "inquirer";

export default async (name: string, options: object, command: object) => {
  console.log("name", typeof name, name);
  console.log("options", typeof options, options);
  console.log("command", typeof command);

  const questions = [];
  questions.push({
    type: "list",
    name: "template",
    message: "Please choose which project template to use",
    choices: ["JavaScript", "TypeScript"],
    default: "JavaScript",
  });

  const answers = await inquirer.prompt(questions);

  console.log(answers);
};
