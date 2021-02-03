import { LogFactory } from '@util/logger/logger';
import { NextFunction, Request, Response } from 'express';

const LOGGER = LogFactory.getLogger('request');

export const requestLogging = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const path = req.path || req.url;
  const method = req.method;
  LOGGER.info(`${ip} called '${path}' with [${method}]'`);
  next();
};
