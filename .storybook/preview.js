import { addDecorator } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator((story, context) => withConsole()(story)(context))