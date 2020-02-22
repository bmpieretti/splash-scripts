import unknownOptions from '../unknownOptions';

test('unknownOptions: Command prototype should get unknown options from Command.parseOptions call', () => {
  const expectedParsed = { unknown: Symbol('test') };
  const args = Symbol('argv');
  const context = {};

  function Command() {}
  Command.prototype.parseOptions = () => null;

  const program = {
    Command
  };

  const unmockedCall = () => Command.prototype.parseOptions.call(context, args);
  const callMock = jest.fn(() => expectedParsed);

  Command.prototype.parseOptions.call = callMock;

  unknownOptions(program);

  const actualParsed = unmockedCall();

  expect(actualParsed).toEqual(expectedParsed);
  expect(callMock).toHaveBeenCalledWith(context, args);
  expect(context.unknownOptions).toEqual(expectedParsed.unknown);
});
