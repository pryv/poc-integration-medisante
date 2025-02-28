/**
 * @license
 * Copyright (C) Pryv https://pryv.com
 * This file is part of Pryv.io and released under BSD-Clause-3 License
 * Refer to LICENSE file
 */
// @flow

const errorsFactory = require('../utils/errorsHandling').factory;

// Middleware that verifies the presence of an authorization token
// 
module.exports = (req: express$Request, res: express$Response, next: express$NextFunction) => {
  next();
};
