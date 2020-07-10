module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  "reporters": [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "unit-tests/unit-test-report.html",
      "logo": "D:/_Napata/dev/apps/acb/logo.png",
      "includeConsoleLog": false,
      "includeFailureMsg": true,
      "append": true
    }]
  ]
};
