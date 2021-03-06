import { IBase } from '@app/model/base.model';
import BaseService from '@app/model/base.service';
import { IArticle } from './article.model';
import { Article } from './article.schema';

export default class ArticleService extends BaseService<IArticle> {
  public async create(params: IArticle): Promise<IArticle> {
    const session = new Article(params);
    return await session.save() as unknown as Promise<IArticle>;
  }

  public async read(query: IBase): Promise<IArticle> {
    return Article.findOne(query) as unknown as Promise<IArticle>;
  }

  public async readAll(): Promise<IArticle[]> {
    return Article.find({}) as unknown as Promise<IArticle[]>;
  }

  public async update(_id: string, params: IArticle): Promise<boolean> {
    const query = { _id };
    return (await Article.updateOne(query, params)).nModified === 1;
  }

  public async delete(_id: string): Promise<boolean> {
    const query = { _id };
    return (await Article.deleteOne(query)).deletedCount === 1;
  }
}
