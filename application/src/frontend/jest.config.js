module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    // global: {
    //   branches: 80,    // Minimum coverage for branches
    //   functions: 80,   // Minimum coverage for functions
    //   lines: 80,       // Minimum coverage for lines
    //   statements: 80,  // Minimum coverage for statements
    // },
  },
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFiles: ['jest-fetch-mock'],
};
  