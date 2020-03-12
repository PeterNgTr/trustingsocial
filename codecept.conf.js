const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://[DOMAIN]/',
      onRequest: (request) => {
        request.headers.auth = '123';
      }
    },
    include: {
      I: './steps_file.js'
    },
    bootstrap: null,
    mocha: {},
    name: 'trustingsocial'
  }
}