// @flow

const errorsFactory = require('../utils/errorsHandling').factory;

// Middleware that verifies the presence of an authorization token
// 
module.exports = (req: express$Request, res: express$Response, next: express$NextFunction) => {
  next();
};
