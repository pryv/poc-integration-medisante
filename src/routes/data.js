// @flow

const middlewares = require('../middlewares');
const PryvConnection = require('../business/pryv/Connection');
const logger = require('../utils/logging').getLogger('routes');
const errorsFactory = require('../utils/errorsHandling').factory;

module.exports = function (expressApp: express$Application, settings: Object) {

  expressApp.post('/data',
    middlewares.authorization,
    async (req: express$Request, res: express$Response, next: express$NextFunction) => {
      try {
        const msgBody = req.body;
        logger.info('XXXXXXXXXX BODY XXXXXXXXXX');
        logger.info(JSON.stringify(req.body));

        logger.info('XXXXXXXXXX HEADERS XXXXXXXXXX');
        logger.info(JSON.stringify(req.headers));
        
        res.status(200).send("salut");
      } catch (err) {
        next(err);
      }
    }
  );

};
