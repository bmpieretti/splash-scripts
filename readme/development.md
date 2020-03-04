## Developing

### Built With

- [Cosmic Config for config management/searching](https://github.com/davidtheclark/cosmiconfig)
- [Commander for handling cli programs](https://github.com/tj/commander.js/)
- [ShellJS for executing cli commands from node](https://github.com/shelljs/shelljs)

### Prerequisites

To get started, simply clone the repo and install node deps
```shell
npm install
```

### Building

Once dependencies are installed, you can build the project and test local changes by starting dev mode:

```shell
npm run dev
```

This will start up a build in watch mode, which will re-babelify all changes as long as the watch server reamins up. In a new terminal, navigate to the root project directory and start developing locally by running

```shell
node index.js --help
```

### Deploying / Publishing

Changes are automatically published upon merging to the master branch via [semantic release](https://github.com/semantic-release/semantic-release)

### Testing

Run tests:

```shell
npm run test
```

Run tests in watch mode:

```shell
npm run test:watch
```

Run tests in coverage mode:

```shell
npm run test:coverage
```

### Style guide

Simply run `npm run verify` to run any linting or validation commands

### Commiting

Commits utilize [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) to force commit history to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Once files are staged, simply run `git commit` and husky will automatically run verify before running conventional commits to assist in formatting semantic commits.
