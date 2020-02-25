import { cosmiconfig } from 'cosmiconfig';
import ConfigException from '../exceptions/ConfigException';
import Config from '../models/Config';

const explorer = cosmiconfig('splash');
let currentConfigDepth = 1;
let allConfigs = [];

const getDirPath = filepath =>
  filepath
    .split('/')
    .slice(0, -1)
    .join('/');

const search = async path => {
  try {
    const result = await explorer.search(path);
    return result;
  } catch (error) {
    allConfigs = [];
    throw new ConfigException(error);
  }
};

const retrieveExtends = async (config, dirPath) => {
  const { extendsArg } = config;
  allConfigs.unshift(config);
  if (!extendsArg?.length) return;
  const promises = extendsArg.map(extendedConfigName => {
    return search(`${dirPath}/node_modules/${extendedConfigName}`);
  });
  const loadedConfigs = await Promise.all(promises);

  const loadedPromises = loadedConfigs.map(loadedConfig => {
    const { config: extendedConfig, filepath } = loadedConfig;
    const dirName = getDirPath(filepath);
    const configClass = new Config(extendedConfig, dirName, currentConfigDepth);
    currentConfigDepth += 1;

    return retrieveExtends(configClass, dirPath, allConfigs);
  });

  await Promise.all(loadedPromises);
};

export const getConfigs = async () => {
  const foundConfig = await search();

  if (!foundConfig) return allConfigs;

  const { config: cosmicConfigObj, filepath } = foundConfig;
  const dirPath = getDirPath(filepath);
  const config = new Config(cosmicConfigObj, dirPath);
  await retrieveExtends(config, dirPath);
  const retrievedConfigs = [...allConfigs];
  currentConfigDepth = 1;
  allConfigs = [];

  return retrievedConfigs;
};