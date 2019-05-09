module.exports = {
  transform: {
    "^.+\\.jsx?$": '<rootDir>/lib/tests/jest-preprocess.js',
  },
  moduleNameMapper: {
    ".+\\.(css|scss)$": 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/lib/tests/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/lib/tests/setup-test-env.js'],
};
