// @flow

const express = require('express');
const middlewares = require('./middlewares');
const nconfSettings = require('./settings');

class Application {
  express: express$Application;
  settings: Object;

  constructor() {
    this.settings = nconfSettings;
    this.express = this.setupExpressApp();
  }

  setupExpressApp(): express$Application {
    const expressApp = express();

    expressApp.use(express.json());
    
    require('./routes/data')(expressApp, this.settings);

    expressApp.use(middlewares.errors);
    
    return expressApp;
  }
}

module.exports = Application;
