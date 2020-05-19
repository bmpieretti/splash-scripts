import path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { chance } from '@splash-plus/jest-config';
import Config from '../../models/Config';
import { getConfigs } from '../cosmicconfig';
import ConfigException from '../../exceptions/ConfigException';

jest.mock('../../models/Config');
jest.mock('path');

jest.mock('cosmiconfig', () => ({
  cosmiconfig: jest.fn().mockReturnValue({
    search: jest.fn()
  })
}));

const genFilePath = () => {
  return chance.n(chance.word, chance.integer({ min: 1, max: 5 })).join('/');
};

jest.mock('../../models/Config');
jest.mock('path');

jest.mock('cosmiconfig', () => ({
  cosmiconfig: jest.fn().mockReturnValue({
    search: jest.fn()
  })
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('Cosmic Config Service: Should setup cosmicconfig with splash keyword', async () => {
  expect(cosmiconfig).toHaveBeenCalledWith('splash');
});

test('Cosmic Config Service: Should return config', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const foundConfig = {
    config: cosmicConfig,
    filepath: genFilePath()
  };
  const placeholder = chance.word();
  searchStub.mockResolvedValue(foundConfig);

  Config.mockImplementation(() => {
    return {
      placeholder
    };
  });

  const configs = await getConfigs();

  const expectedConfig = {
    placeholder
  };

  expect(Config).toHaveBeenCalledTimes(1);

  expect(Config).toHaveBeenCalledWith(
    cosmicConfig,
    foundConfig.filepath
      .split('/')
      .slice(0, -1)
      .join('/')
  );
  expect(searchStub).toHaveBeenCalledTimes(1);
  expect(searchStub).toHaveBeenCalledWith(undefined);
  expect(configs).toEqual([expectedConfig]);
});

test('Cosmic Config Service: Should return config when using a relative path', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendsArg = ['./test'];
  const originalFilepath = genFilePath();
  const extendedFilepath = `${genFilePath()}/${extendsArg[0]}`;
  path.isAbsolute.mockReturnValueOnce(false);
  path.resolve.mockReturnValueOnce(extendedFilepath);

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${originalFilepath}/splash.config.js`
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: `${extendedFilepath}/splash.config.js`
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig2);

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg,
      test: 1
    })
    .mockReturnValueOnce({
      test: 2
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      test: 2
    },
    {
      extendsArg,
      test: 1
    }
  ];

  expect(path.isAbsolute).toHaveBeenCalledTimes(1);
  expect(path.isAbsolute).toHaveBeenCalledWith(extendsArg[0]);
  expect(path.resolve).toHaveBeenCalledTimes(1);
  expect(path.resolve).toHaveBeenCalledWith(originalFilepath, extendsArg[0]);
  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(1, cosmicConfig, originalFilepath);
  expect(Config).toHaveBeenNthCalledWith(2, cosmicConfig2, extendedFilepath, 1);
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(2, extendedFilepath);
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should return config when using an absolute path', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendedAbsoluteBasePath = `/${genFilePath()}`;
  const extendsArg = [`${extendedAbsoluteBasePath}/${chance.word()}`];
  const currentConfigPathRoot = genFilePath();
  path.isAbsolute.mockReturnValueOnce(true);

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${currentConfigPathRoot}/splash.config.js`
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: extendsArg[0]
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig2);

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg,
      test: 1
    })
    .mockReturnValueOnce({
      test: 2
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      test: 2
    },
    {
      extendsArg,
      test: 1
    }
  ];

  expect(path.isAbsolute).toHaveBeenCalledTimes(1);
  expect(path.isAbsolute).toHaveBeenCalledWith(extendsArg[0]);
  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(
    1,
    cosmicConfig,
    `${currentConfigPathRoot}`
  );
  expect(Config).toHaveBeenNthCalledWith(
    2,
    cosmicConfig2,
    extendedAbsoluteBasePath,
    1
  );
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(2, extendsArg[0]);
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should return multiple configs when extended, stopping at empty extends', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendsArg = [chance.word()];
  const extendsArg2 = [];
  const currentConfigPathRoot = genFilePath();
  const expectedExtendedPath = `${currentConfigPathRoot}/node_modules/${extendsArg[0]}`;

  const testCommand = chance.word();
  const name = chance.word();

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${currentConfigPathRoot}/splash.config.js`
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: `${expectedExtendedPath}/splash.config.js`
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig2);

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg2,
      [name]: testCommand
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      extendsArg: [],
      [name]: testCommand
    },
    {
      extendsArg
    }
  ];

  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(
    1,
    cosmicConfig,
    currentConfigPathRoot
  );
  expect(Config).toHaveBeenNthCalledWith(
    2,
    cosmicConfig2,
    expectedExtendedPath,
    1
  );
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(2, expectedExtendedPath);
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should return multiple configs when extended, stopping at undef extends', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendsArg = [chance.word()];
  const currentConfigPathRoot = genFilePath();
  const expectedExtendedPath = `${currentConfigPathRoot}/node_modules/${extendsArg[0]}`;

  const testCommand = chance.word();
  const name = chance.word();

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${currentConfigPathRoot}/splash.config.js`
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: `${expectedExtendedPath}/splash.config.js`
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig2);

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg
    })
    .mockReturnValueOnce({
      [name]: testCommand
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      [name]: testCommand
    },
    {
      extendsArg
    }
  ];

  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(
    1,
    cosmicConfig,
    currentConfigPathRoot
  );
  expect(Config).toHaveBeenNthCalledWith(
    2,
    cosmicConfig2,
    expectedExtendedPath,
    1
  );
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(2, expectedExtendedPath);
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should not include configs when search fails to find at the given path', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const extendsArg = [chance.word()];
  const currentConfigPathRoot = genFilePath();

  const testCommand = chance.word();
  const name = chance.word();

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${currentConfigPathRoot}/splash.config.js`
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig);

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg
    })
    .mockReturnValueOnce({
      [name]: testCommand
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      extendsArg
    }
  ];

  expect(Config).toHaveBeenCalledTimes(1);
  expect(Config).toHaveBeenNthCalledWith(
    1,
    cosmicConfig,
    currentConfigPathRoot
  );
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(
    2,
    `${currentConfigPathRoot}/node_modules/${extendsArg[0]}`
  );
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should recursively fetch multiple configs when extended', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const cosmicConfig3 = Symbol('cosmicConfig3');
  const cosmicConfig4 = Symbol('cosmicConfig4');
  const extendsArg = [chance.word()];
  const extendsArg1 = [chance.word()];
  const extendsArg2 = [chance.word()];

  const currentConfigPathRoot = genFilePath();
  const expectedExtendedPath = `${currentConfigPathRoot}/node_modules/${extendsArg[0]}`;
  const expectedExtendedPath1 = `${currentConfigPathRoot}/node_modules/${extendsArg1[0]}`;
  const expectedExtendedPath2 = `${currentConfigPathRoot}/node_modules/${extendsArg2[0]}`;

  const foundConfig = {
    config: cosmicConfig,
    filepath: `${currentConfigPathRoot}/splash.config.js`
  };
  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: `${expectedExtendedPath}/splash.config.js`
  };
  const foundConfig3 = {
    config: cosmicConfig3,
    filepath: `${expectedExtendedPath1}/splash.config.js`
  };
  const foundConfig4 = {
    config: cosmicConfig4,
    filepath: `${expectedExtendedPath2}/splash.config.js`
  };
  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockResolvedValueOnce(foundConfig2)
    .mockResolvedValueOnce(foundConfig3)
    .mockResolvedValueOnce(foundConfig4);
  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg,
      test: 1
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg1,
      test: 2
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg2,
      test: 3
    })
    .mockReturnValueOnce({
      extendsArg: null,
      pathYo: 4
    });
  searchStub.mockImplementation(() => search());
  Config.mockImplementation(() => config());
  const configs = await getConfigs();
  const expectedConfigs = [
    {
      extendsArg: null,
      pathYo: 4
    },
    {
      extendsArg: extendsArg2,
      test: 3
    },
    {
      extendsArg: extendsArg1,
      test: 2
    },
    {
      extendsArg,
      test: 1
    }
  ];

  expect(Config).toHaveBeenCalledTimes(4);
  expect(Config).toHaveBeenNthCalledWith(
    1,
    cosmicConfig,
    currentConfigPathRoot
  );
  expect(Config).toHaveBeenNthCalledWith(
    2,
    cosmicConfig2,
    expectedExtendedPath,
    1
  );
  expect(Config).toHaveBeenNthCalledWith(
    3,
    cosmicConfig3,
    expectedExtendedPath1,
    2
  );
  expect(Config).toHaveBeenNthCalledWith(
    4,
    cosmicConfig4,
    expectedExtendedPath2,
    3
  );
  expect(searchStub).toHaveBeenCalledTimes(4);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(2, expectedExtendedPath);
  expect(searchStub).toHaveBeenNthCalledWith(3, expectedExtendedPath1);
  expect(searchStub).toHaveBeenNthCalledWith(4, expectedExtendedPath2);
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should still throw error on any error from search', async () => {
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const extendsArg = [chance.word()];
  const error = new Error(chance.word());

  const foundConfig = {
    config: cosmicConfig,
    filepath: genFilePath()
  };

  const search = jest
    .fn()
    .mockResolvedValueOnce(foundConfig)
    .mockRejectedValue(error);

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => {
    return {
      extendsArg
    };
  });

  await expect(getConfigs()).rejects.toThrow(ConfigException);
  await expect(getConfigs()).rejects.toThrow(
    new ConfigException({ message: error.message })
  );
});

test('Cosmic Config Service: Should return empty on no config', async () => {
  const searchStub = cosmiconfig().search;
  searchStub.mockResolvedValue(undefined);

  const configs = await getConfigs();

  expect(configs).toEqual([]);
});

test('Cosmic Config Service: Should throw error on invalid config', async () => {
  const error = new Error(chance.word());

  cosmiconfig().search.mockRejectedValue(error);

  await expect(getConfigs()).rejects.toThrow(ConfigException);
  await expect(getConfigs()).rejects.toThrow(
    new ConfigException({ message: error.message })
  );
});
