module.exports = {
  transform                 : {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex                 : '(/tests/*(test|spec).*|(\\.|/)(test|spec))\\.(jsx?|tsc?)$',
  testPathIgnorePatterns    : ['/node_modules/', '/tests/coverage/.*', '/tests/mocks/.*'],
  moduleFileExtensions      : ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper          : {
    '^@app/(.*)$'   : '<rootDir>/src/app/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@util/(.*)$'   : '<rootDir>/src/util/$1',
    '^@pack'        : '<rootDir>/package.json',
  },
  preset                    : 'ts-jest',
  testEnvironment           : 'node',
  collectCoverage           : false,
  collectCoverageFrom       : [
    './src/**/*.{ts,tsx}',
    '!./src/server.ts',
    '!./src/config/*',
    '!./src/app/middleware/logging/*',
    '!./src/util/logger/*',
  ],
  coverageDirectory         : './test/coverage/',
  coveragePathIgnorePatterns: ['/test/.*', 'node_modules'],
  coverageReporters         : ['json', 'lcov', 'text', 'clover'],
  coverageThreshold         : {
    global            : {
      branches  : 80,
      functions : 70,
      lines     : 70,
      statements: -10
    },
    './src/app/app.ts': {
      branches  : 0,
      functions : 25,
      statements: 50,
      lines     : 25
    }
  }
};
