import { V1Router } from '@app/routes/v1/v1.router';
import { VERSION } from '@config/environment';
import { RESPONSE_CODES } from '@config/router.constants';
import { LogFactory } from '@util/logger/logger';
import express, { NextFunction, Request, Response, Router } from 'express';


const LOGGER = LogFactory.getLogger('routing');
const router: Router = express.Router();


router.get('/', (req: Request, res: Response) => {
  LOGGER.debug(`app called via ${req.hostname} with ${req.method}`);
  res.send(`it works with version [${VERSION}]`);
});

router.use('/v1', V1Router);

// 404 - not found
router.get('/*', (req: Request, res: Response) => {
  debugErrorRequest(req);
  res.status(RESPONSE_CODES.NOT_FOUND).send('404 - page not found');
});

// 501 - not implemented
router.use('/*', (req: Request, res: Response, next: NextFunction) => {
  debugErrorRequest(req);
  res.status(RESPONSE_CODES.NOT_IMPLEMENTED).send('501 - not implemented');
  next();
});


function debugErrorRequest(req: Request): void {
  LOGGER.debug(`${req.ip} tried: ${req.method} on ${req.baseUrl || '/'}`);
}

function routingError(err: Error, req: Request, res: Response, next: NextFunction): void {
  const msg = `general routing error [${err.message}]`;
  LOGGER.error(msg);
  LOGGER.debug(msg, err);
  res.status(RESPONSE_CODES.SERVER_ERROR).send('Something went wrong');
  next(err);
}


export { router, routingError, LOGGER as ROUTING_LOGGER };
