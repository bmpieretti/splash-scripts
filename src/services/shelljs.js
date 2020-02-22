import shell from 'shelljs';

const ENABLE_OUTPUT_COLOR = '--color=always';

export const runCommand = (command, unknownOptions) => {
  if (!command?.fullCommand) return;

  const { fullCommand } = command;
  const unknownOptionsString = unknownOptions ? ` ${unknownOptions} ` : ' ';
  const executableCommand = `${fullCommand}${unknownOptionsString}${ENABLE_OUTPUT_COLOR}`;
  shell.exec(executableCommand);
  // TODO: Read in exception and exit the process on shell error? Be careful though only want to pass through errors,
  // TODO: And not handle them here.
  // TODO: Can test this by removing the config param passed to the @splash/jest-config.
};
