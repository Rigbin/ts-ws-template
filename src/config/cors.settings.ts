import { LogFactory } from '@util/logger/logger';
import { Request } from 'express';

const LOGGER = LogFactory.getLogger('CORS');

/**
 * Setup your cors whitelist
 */
const whitelist = [
  '*',
  'http://localhost',
];

export const CorsOptionsDelegate = (req: Request, callback: any) => {
  const origin = req.header('Origin') || '*';
  if (!origin || whitelist.indexOf(origin) >= 0) {
    LOGGER.debug(`${origin}`);
    return callback(null, {
      origin,
      methods: ['GET', 'HEAD'],
    });
  } else {
    const msg = `${origin} not allowed by CORS`;
    LOGGER.error(msg);
    return callback(new Error(msg));
  }
};
