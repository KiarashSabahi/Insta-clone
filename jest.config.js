module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  "preset": 'ts-jest',
  "testEnvironment": 'node',
  "moduleDirectories": ["src", 'node_modules'],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};