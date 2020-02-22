import { getConfigs } from './cosmicconfig';
import CommandList from '../models/CommandList';

export const getSplashCommands = async () => {
  const allConfigs = await getConfigs();
  const commandList = new CommandList(allConfigs);
  return commandList.commands;
};
