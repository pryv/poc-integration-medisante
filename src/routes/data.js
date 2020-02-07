// @flow

const middlewares = require('../middlewares');
const PryvConnection = require('../business/pryv/Connection');
const logger = require('../utils/logging').getLogger('routes');

const MEDISANTE_STREAMID = 'bridge-medisante';



module.exports = function (expressApp: express$Application, settings: Object) {

  const con = new PryvConnection(settings.get('pryv:pryvApiEndpoint'));

  expressApp.post('/data',
    middlewares.authorization,
    async (req: express$Request, res: express$Response, next: express$NextFunction) => {
      try {
        logger.info('XXXXXXXXXX BODY XXXXXXXXXX');
        logger.info(JSON.stringify(req.body));

        logger.info('XXXXXXXXXX HEADERS XXXXXXXXXX');
        logger.info(JSON.stringify(req.headers));

        const body = req.body;

        let event;
        if (body.metadata && body.metadata.measurementType && body.metadata.measurementType === 'BodyWeightComposition') {
          event = parseWeight(body);
        }
        if (
          body.metadata &&
          body.metadata.measurementType &&
          body.metadata.measurementType === 'BloodPressure'
        ) {
          event = parseBloodPressure(body);
        }
        if (
          body.metadata &&
          body.metadata.measurementType &&
          body.metadata.measurementType === 'Glucose'
        ) {
          event = parseGlucose(body);
        }
        

        if (event) {
          const pryvResponse = await con.createEvent(event);
          logger.info('XXXXXXXXXX PRYV RESPONSE XXXXXXXXXX');
          logger.info(JSON.stringify(pryvResponse.body));
        }
        
        
        logger.info('');
        res.status(200).send('salut');
      } catch (err) {
        next(err);
      }
    }
  );

};

function parseGlucose(body: Object): Object {
  let t = new Date(body.measurements.timestamp);
  const event = {
    streamId: MEDISANTE_STREAMID,
    type: 'density/mmol-l',
    content: body.measurements.glucose.value,
    time: t.getTime() / 1000
  };
  return event;
}


function parseBloodPressure(body: Object): Object {
  let t = new Date(body.measurements.timestamp);
  const event = {
    streamId: MEDISANTE_STREAMID,
    type: 'blood-pressure/mmhg-bpm',
    content: {
      systolic: body.measurements.systolicBloodPressure.value,
      diastolic: body.measurements.diastolicBloodPressure.value,
      rate: body.measurements.pulse.value,
    },
    time: t.getTime() / 1000
  };
  return event;
}

function parseWeight(body: Object): Object {
  let t = new Date(body.measurements.timestamp);
  const event = {
    streamId: MEDISANTE_STREAMID,
    type: 'mass/kg',
    content: body.measurements.bodyWeight.value,
    time: t.getTime() / 1000
  };
  return event;
}

