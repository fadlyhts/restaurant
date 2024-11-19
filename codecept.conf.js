const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/e2e/**/*.test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      windowSize: '1200x900',
      waitForAction: 1000,
      waitForTimeout: 5000,
      chrome: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
  },
  include: {
    I: './steps.js'
  },
  bootstrap: null,
  mocha: {},
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 3
    },
    screenshotOnFail: {
      enabled: true
    },
    pauseOnFail: {},
    tryTo: {
      enabled: true
    }
  },
  name: 'restaurant'
}
