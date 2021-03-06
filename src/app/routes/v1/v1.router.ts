import { ROUTING_LOGGER } from '@app/router';
import express, { Request, Response, Router } from 'express';
import { ArticleRouter } from './article/article.router';

const v1: Router = express.Router();

v1.get('/', async (req: Request, res: Response) => {
  ROUTING_LOGGER.debug(`v1 called via ${req.hostname} with ${req.method}`);
  res.send('API v1');
});

v1.use('/article', ArticleRouter);

export { v1 as V1Router };
