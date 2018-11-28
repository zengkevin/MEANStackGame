module.exports = {
  extends: [
    'airbnb/legacy'
  ],
  rules: {
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    jasmine: true,
    mocha: true,
    jquery: true
  },
  globals: {
    angular: true,
    by: true,
    browser: true,
    element: true,
    inject: true,
    io: true,
    moment: true,
    Modernizr: true,
    Promise: true,
    __TESTING__: true,
    _: false,
    ApplicationConfiguration: true
  }
};
