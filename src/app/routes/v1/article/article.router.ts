import { ArticleController } from '@app/controller/article/article.controller';
import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();
const controller: ArticleController = new ArticleController();

router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));
router.post('/', (req: Request, res: Response) => controller.create(req, res));
router.put('/:id', (req: Request, res: Response) => controller.update(req, res));
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

export { router as ArticleRouter };
