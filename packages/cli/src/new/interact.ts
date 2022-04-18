import prompts from "prompts";
import main from "./bin";

export default async (name: string) => {
  const answers = await prompts({
    type: "toggle",
    name: "default",
    message: "Use all defaults?",
    initial: true,
    active: "Yes",
    inactive: "No",
  });

  let options = {
    name,
    typescript: false,
    template: "skeleton" as const,
    eslint: false,
    prettier: false,
    playwright: false,
  };

  if (!answers.default) {
    const choices = await prompts(
      [
        {
          type: "toggle",
          name: "typescript",
          message: "Use TypeScript?",
          initial: false,
          active: "Yes",
          inactive: "No",
        },
        {
          type: "toggle",
          name: "eslint",
          message: "Add ESLint for code linting?",
          initial: false,
          active: "Yes",
          inactive: "No",
        },
        {
          type: "toggle",
          name: "prettier",
          message: "Add Prettier for code formatting?",
          initial: false,
          active: "Yes",
          inactive: "No",
        },
        {
          type: "toggle",
          name: "playwright",
          message: "Add Playwright for browser testing?",
          initial: false,
          active: "Yes",
          inactive: "No",
        },
      ],
      {
        onCancel: () => {
          process.exit(1);
        },
      }
    );
    options.eslint = choices.eslint;
    options.prettier = choices.prettier;
    options.typescript = choices.typescript;
  }

  main(options);
};
