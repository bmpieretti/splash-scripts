import {
  init,
  buildCommands,
  handleUnknownCommands,
  parse,
  buildHelp
} from '../services/commander';
import { runCommand } from '../services/shelljs';
import { getSplashCommands } from '../services/splashconfig';

export default () =>
  getSplashCommands()
    .then(config => {
      init();
      buildCommands(config, runCommand);
      handleUnknownCommands();
      buildHelp();
      parse();
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error.stack || error);
    });
