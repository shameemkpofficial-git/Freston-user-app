// @noflow

const {DefaultReporter} = require('@jest/reporters');

class Reporter extends DefaultReporter {
  constructor(...args) {
    super(...args);
  }

  printTestFileHeader(...args) {
    // eslint-disable-next-line no-unused-vars
    const [_testPath, config, result, ...rest] = args;
    const console = result.console;

    if (result.numFailingTests === 0 && !result.testExecError) {
      result.console = null;
    }

    super.printTestFileHeader(...args);

    result.console = console;
  }
}

module.exports = Reporter;