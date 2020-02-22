const handleUnknownOptions = (commander, unknownOptions) => {
  const joinedOptions = unknownOptions?.join?.(' ') || '';
  return `${commander?.unknownOptions || ''} ${joinedOptions}`.trim();
};

export default class Commander {
  commander = null;

  unknownOptions = null;

  constructor(commanderOptions) {
    if (Array.isArray(commanderOptions)) {
      this.commander = commanderOptions.pop();
      this.unknownOptions = handleUnknownOptions(
        this.commander,
        commanderOptions
      );
      return;
    }
    this.commander = commanderOptions;
    this.unknownOptions = handleUnknownOptions(this.commander);
  }
}
