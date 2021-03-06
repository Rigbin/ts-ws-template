import { IBase } from '@app/model/base.model';

export interface IArticle extends IBase {
  number: string;
  name: string;
  description?: string;
}
