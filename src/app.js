/**
 * @license
 * Copyright (C) Pryv https://pryv.com
 * This file is part of Pryv.io and released under BSD-Clause-3 License
 * Refer to LICENSE file
 */
// @flow

const express = require('express');
const bodyParser = require('body-parser');
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

    expressApp.disable('x-powered-by');

    expressApp.use(express.json());
    expressApp.use(bodyParser.json({ limit: '20mb' }));
    
    require('./routes/data')(expressApp, this.settings);

    expressApp.use(middlewares.errors);
    
    return expressApp;
  }
}

module.exports = Application;
