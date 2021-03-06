import { RESPONSE_CODES } from '@config/router.constants';
import { IArticle } from '@app/model/article/article.model';
import ArticleService from '@app/model/article/article.service';
import { LogFactory } from '@util/logger/logger';
import { Request, Response } from 'express';
import BaseController from '@controller/base.controller';

const LOGGER = LogFactory.getLogger('Article');

export class ArticleController extends BaseController {
  private service = new ArticleService();

  public async create(req: Request, res: Response): Promise<void> {
    if (req.body.number && req.body.name) {
      const params: IArticle = req.body;
      try {
        res.status(RESPONSE_CODES.CREATED).json(await this.service.create(params));
      } catch (err) {
        LOGGER.error(err);
        res.status(RESPONSE_CODES.SERVER_ERROR).json(err);
      }
    } else {
      res.status(RESPONSE_CODES.BAD_REQUEST).json({
        error: 'invalid request',
        request: req.body,
      });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      res.json(await this.service.readAll());
    } catch (err) {
      LOGGER.error(err);
      res.status(RESPONSE_CODES.SERVER_ERROR).json(err);
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      res.json(await this.service.read({ _id: req.params.id }));
    } catch (err) {
      LOGGER.error(err);
      res.status(RESPONSE_CODES.SERVER_ERROR).json(err);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      res.json({ updated: await this.service.update(req.params.id, req.body) });
    } catch (err) {
      LOGGER.error(err);
      res.status(RESPONSE_CODES.SERVER_ERROR).json(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      res.json({ deleted: await this.service.delete(req.params.id) });
    } catch (err) {
      LOGGER.error(err);
      res.status(RESPONSE_CODES.SERVER_ERROR).json(err);
    }
  }
}
