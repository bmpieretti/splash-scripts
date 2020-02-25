## Getting Started

### Basic Usage
In order to use this module, you first need to create a `splash.config.js`, or one of the config options [cosmic-config](https://github.com/davidtheclark/cosmiconfig) supports. A basic one looks a bit like this:
```js
// splash.config.js
{
  extends: '@splash-plus/config-jest',
  commands: [
    {
      name: 'echo',
      resolve: 'local',
      description: 'Runs the echo command',
      command: 'echo "Hello World!"'
    }
  ]
}
```

And from there, you can run the command within an npm script context:
```json
// package.json
{
  ...,
  "script": {
    "echo": "splash-scripts echo",
    ...
  },
  ...
}
```

Upon running `npm run echo`, you should see `"Hello World!"` printed to the console!

### Config Options
TODO: List options for top level fields: extends and commands

### Command Options
TODO: List options for command level fields: name, resolves, command, description
