
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#-pkgname-)

# @splash-plus/scripts
[![CircleCI](https://circleci.com/gh/bmpieretti/splash-scripts.svg?style=svg)](https://circleci.com/gh/bmpieretti/splash-scripts)

<br />
Simple script wrappers for sharing common logic 

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#table-of-contents)

## Table of Contents

* [@splash-plus/scripts](#splash-plusscripts)
	* [What Is This?](#what-is-this)
	* [Getting Started](#getting-started)
		* [Basic Usage](#basic-usage)
		* [Config Options](#config-options)
		* [Command Options](#command-options)
	* [Usage](#usage)
		* [Configurations](#configurations)
	* [Versioning](#versioning)
	* [Developing](#developing)
		* [Built With](#built-with)
		* [Prerequisites](#prerequisites)
		* [Setting up Dev](#setting-up-dev)
		* [Building](#building)
		* [Deploying / Publishing](#deploying--publishing)
		* [Testing](#testing)
		* [Style guide](#style-guide)
		* [Commiting](#commiting)
	* [Licensing](#licensing)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#what-is-this)

## What Is This?

This package aims to extend the power of npm scripts in modern javascript projects by providing an abstraction layer to modern project configuration, while providing everything a developer would need to scaffold configs like webpack, babel, jest, and more with sane configuration defaults. In case these defaults just aren't the right fit for your project, this project can also be extended as needed to still provide a starting point for your project configuration

In simpler terms, it's shareable config management as a cli, so you and I can manage all our jest, webpack, eslint, stylelint, and the other 400 or so configs needed for all the bells and whistles in a modern js project in one place so they can be reusable and extended.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#getting-started)

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
  "scripts": {
    "echo": "splash-scripts echo"
  },
}
```

Upon running `npm run echo`, you should see `"Hello World!"` printed to the console!

### Config Options
| Field                 | Type                                     | Description                                      |
|-----------------------|------------------------------------------|--------------------------------------------------|
| extends               | String/Array\<String\>                     | Configs module to be extended, or array of modules to be extended. Currently only supports a module name from a node module <br /><br /> **Note:** For local builds your package.json can reference a local dir, allowing you to leverage extending a local splash config, but this will fail in ci if your setup fails to find the proper directory |
| commands              | Array<[Command](#command-options)>                                           | Array of Command Objects |

### Command Options
| Field                 | Type                                     | Description                                      |
|-----------------------|------------------------------------------|--------------------------------------------------|
| name                  | String                     | *Required* <br /><br /> The reference name of the command, and how splash-scripts resolves the command. This is what splash scripts maps to when passed an argument, for example a command with name `print` with be referenced via `splash-scripts print` |
| description           | String                                   | A (hopefully) semantic description of what your command does, is used to generate the api on any run of `splash-scripts --help` |
| resolve           | Enum\<'local'/'npx'\>                                           | *Defaults to 'npx'*<br /><br /> Uses npx by default to run commands via npx, you'll want to set this to `'local'` for any cli package that doesn't exist on the npm registry. For local, you will need the package installed on the os or in the current node context, meaning the package much be installed in your node modules or be globally available on the system |
| command           | String                                           | *Required* <br /><br /> The actual command to run. Can be whatever cli tool you're trying to abstract out. <br /><br /> **Note:** When using a resolve type of `npx`, npx allows specifing the version after the package name, such as `webpack@4`, for more control/safety against breaking changes. Do note that I have seen a few packages only grab the latest, so in that case setting it to local and requiring the needed module as a dependency (peerDep for extended modules) might be the best solution |


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#usage)

## Usage


### Configurations
TODO: Examples on overriding, script calling, extending, using the config file in general


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#versioning)

## Versioning

Using [SemVer](http://semver.org/) for versioning. For the versions available, see the TODO: [link to tags on this repository](/tags).


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#developing)

## Developing

### Built With

TODO: List main libraries, frameworks used including versions (React, Angular etc...)

### Prerequisites

TODO: What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.

### Setting up Dev

TODO: Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone repo-here
cd your-project/
npm install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

TODO: If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing

TODO: give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

### Testing

TODO: Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

### Style guide

TODO: Explain your code style and show how to check it.

### Commiting

TODO: Explain how commiting works with conventional commits


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/water.png)](#licensing)

## Licensing

Licensed under [MIT](https://opensource.org/licenses/MIT).

