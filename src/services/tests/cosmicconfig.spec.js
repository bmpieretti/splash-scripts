import { cosmiconfig } from 'cosmiconfig';
import { CONFIG_EXCEPTION_ERROR_MESSAGE } from '../../configs/textEnums';
import Config from '../../models/Config';

jest.mock('../../models/Config');

jest.mock('cosmiconfig', () => ({
  cosmiconfig: jest.fn().mockReturnValue({
    search: jest.fn()
  })
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('Cosmic Config Service: Should return config', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const foundConfig = {
    config: cosmicConfig,
    filepath: 'path/to/test'
  };
  searchStub.mockImplementation(() => Promise.resolve(foundConfig));

  Config.mockImplementation(() => {
    return {
      placeholder: 'test'
    };
  });

  const configs = await getConfigs();

  const expectedConfig = {
    placeholder: 'test'
  };

  expect(cosmiconfig).toBeCalledWith('splash');
  expect(Config).toHaveBeenCalledTimes(1);
  expect(Config).toHaveBeenCalledWith(cosmicConfig, 'path/to');
  expect(searchStub).toHaveBeenCalledTimes(1);
  expect(searchStub).toHaveBeenCalledWith(undefined);
  expect(configs).toEqual([expectedConfig]);
});

test('Cosmic Config Service: Should return multiple configs when extended, stopping at empty extends', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendsArg = ['test'];
  const extendsArg2 = [];

  const foundConfig = {
    config: cosmicConfig,
    filepath: 'path/to/test'
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: 'path2/to2/test2'
  };

  const search = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(foundConfig))
    .mockReturnValueOnce(Promise.resolve(foundConfig2));

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg2,
      test: 'test'
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      extendsArg: [],
      test: 'test'
    },
    {
      extendsArg
    }
  ];

  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(1, cosmicConfig, 'path/to');
  expect(Config).toHaveBeenNthCalledWith(2, cosmicConfig2, 'path2/to2', 1);
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(
    2,
    `path/to/node_modules/${extendsArg[0]}`
  );
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should return multiple configs when extended, stopping at undef extends', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const extendsArg = ['test'];

  const foundConfig = {
    config: cosmicConfig,
    filepath: 'path/to/test'
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: 'path2/to2/test2'
  };

  const search = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(foundConfig))
    .mockReturnValueOnce(Promise.resolve(foundConfig2));

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg
    })
    .mockReturnValueOnce({
      test: 'test'
    });

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => config());

  const configs = await getConfigs();

  const expectedConfigs = [
    {
      test: 'test'
    },
    {
      extendsArg
    }
  ];

  expect(Config).toHaveBeenCalledTimes(2);
  expect(Config).toHaveBeenNthCalledWith(1, cosmicConfig, 'path/to');
  expect(Config).toHaveBeenNthCalledWith(2, cosmicConfig2, 'path2/to2', 1);
  expect(searchStub).toHaveBeenCalledTimes(2);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(
    2,
    `path/to/node_modules/${extendsArg[0]}`
  );
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should recursively fetch multiple configs when extended', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const cosmicConfig2 = Symbol('cosmicConfig2');
  const cosmicConfig3 = Symbol('cosmicConfig3');
  const cosmicConfig4 = Symbol('cosmicConfig4');
  const extendsArg = ['test'];
  const extendsArg2 = ['test2'];
  const extendsArg3 = ['test3'];

  const foundConfig = {
    config: cosmicConfig,
    filepath: 'path/to/test'
  };

  const foundConfig2 = {
    config: cosmicConfig2,
    filepath: 'path2/to2/test2'
  };

  const foundConfig3 = {
    config: cosmicConfig3,
    filepath: 'path3/to3/test3'
  };

  const foundConfig4 = {
    config: cosmicConfig4,
    filepath: 'path4/to4/test4'
  };

  const search = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(foundConfig))
    .mockReturnValueOnce(Promise.resolve(foundConfig2))
    .mockReturnValueOnce(Promise.resolve(foundConfig3))
    .mockReturnValueOnce(Promise.resolve(foundConfig4));

  const config = jest
    .fn()
    .mockReturnValueOnce({
      extendsArg,
      test: 1
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg2,
      test: 2
    })
    .mockReturnValueOnce({
      extendsArg: extendsArg3,
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
      extendsArg: extendsArg3,
      test: 3
    },
    {
      extendsArg: extendsArg2,
      test: 2
    },
    {
      extendsArg,
      test: 1
    }
  ];

  expect(Config).toHaveBeenCalledTimes(4);
  expect(Config).toHaveBeenNthCalledWith(1, cosmicConfig, 'path/to');
  expect(Config).toHaveBeenNthCalledWith(2, cosmicConfig2, 'path2/to2', 1);
  expect(Config).toHaveBeenNthCalledWith(3, cosmicConfig3, 'path3/to3', 2);
  expect(Config).toHaveBeenNthCalledWith(4, cosmicConfig4, 'path4/to4', 3);
  expect(searchStub).toHaveBeenCalledTimes(4);
  expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
  expect(searchStub).toHaveBeenNthCalledWith(
    2,
    `path/to/node_modules/${extendsArg[0]}`
  );
  expect(searchStub).toHaveBeenNthCalledWith(
    3,
    `path/to/node_modules/${extendsArg2[0]}`
  );
  expect(searchStub).toHaveBeenNthCalledWith(
    4,
    `path/to/node_modules/${extendsArg3[0]}`
  );
  expect(configs).toEqual(expectedConfigs);
});

test('Cosmic Config Service: Should still throw error on any error from search', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  const cosmicConfig = Symbol('cosmicConfig');
  const extendsArg = ['test'];
  const error = { message: 'error' };

  const foundConfig = {
    config: cosmicConfig,
    filepath: 'path/to/test'
  };

  const search = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(foundConfig))
    .mockReturnValueOnce(Promise.reject(error));

  searchStub.mockImplementation(() => search());

  Config.mockImplementation(() => {
    return {
      extendsArg
    };
  });

  try {
    await getConfigs();
    expect(true).toBe(false);
  } catch (actualError) {
    expect(Config).toHaveBeenCalledWith(cosmicConfig, 'path/to');
    expect(searchStub).toHaveBeenCalledTimes(2);
    expect(searchStub).toHaveBeenNthCalledWith(1, undefined);
    expect(searchStub).toHaveBeenNthCalledWith(
      2,
      `path/to/node_modules/${extendsArg[0]}`
    );
    expect(actualError.type).toBe('config-exception');
    expect(actualError.message).toBe(
      CONFIG_EXCEPTION_ERROR_MESSAGE(error.message)
    );
  }
});

test('Cosmic Config Service: Should return empty on no config', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const searchStub = cosmiconfig().search;
  searchStub.mockImplementation(() => Promise.resolve(undefined));

  const configs = await getConfigs();
  expect(configs).toEqual([]);
});

test('Cosmic Config Service: Should throw error on invalid config', async () => {
  // eslint-disable-next-line global-require
  const { getConfigs } = require('../cosmicconfig');
  const error = { message: 'error' };

  cosmiconfig().search.mockImplementation(() => Promise.reject(error));

  try {
    await getConfigs();
    expect(true).toBe(false);
  } catch (actualError) {
    expect(actualError.type).toBe('config-exception');
    expect(actualError.message).toBe(
      CONFIG_EXCEPTION_ERROR_MESSAGE(error.message)
    );
  }
});