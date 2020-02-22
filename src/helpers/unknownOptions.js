// Credit to arzyu on github for the function: https://github.com/arzyu/commander-with-unknown-option-patched
export default program => {
  const { Command } = program;
  const originParseOptions = Command.prototype.parseOptions;

  Command.prototype.parseOptions = function overrideParseOptions(args) {
    const parsed = originParseOptions.call(this, args);
    this.unknownOptions = parsed.unknown;
    return parsed;
  };
};
