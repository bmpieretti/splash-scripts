module.exports = {
  rootDir: process.cwd(),
  watchPathIgnorePatterns: [
    '<rootDir>/src/helpers/tests/files',
    '<rootDir>/lib/'
  ],
  testPathIgnorePatterns: ['<rootDir>/lib/'],
  coveragePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/(?:.+?)/configs/'],
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
