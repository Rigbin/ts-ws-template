import { Request, Response } from 'express';

export default abstract class BaseController {
  public abstract create(req: Request, res: Response): Promise<void>;
  public abstract getAll(req: Request, res: Response): Promise<void>;
  public abstract getById(req: Request, res: Response): Promise<void>;
  public abstract update(req: Request, res: Response): Promise<void>;
  public abstract delete(req: Request, res: Response): Promise<void>;
}
