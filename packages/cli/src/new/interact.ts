import prompts from "prompts";
import main from "./bin";

export default async (name: string, options: object, command: object) => {
  const answers = await prompts({
    type: "select",
    name: "salute",
    message: "Ciao, come va?",
    choices: [
      {
        title: "Bene",
        description: "Alla grande!",
        value: true,
      },
      { title: "Male", value: false },
      { title: "Non So/Non rispondo", value: null, disabled: true },
    ],
    initial: 1,
  });

  if (!answers.salute) return;

  console.log(answers);
  main(name);
};
