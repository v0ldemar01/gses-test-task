/* eslint-disable import/no-default-export */

export default {
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePaths: [ '<rootDir>' ],
  transformIgnorePatterns: ['/node_modules/'],
};
