import { IBase } from './base.model';

export default abstract class BaseService<T extends IBase> {
  public abstract create(params: T): Promise<T>;
  public abstract read(query: IBase): Promise<T>;
  public abstract readAll(): Promise<T[]>;
  public abstract update(_id: string, params: T): Promise<boolean>;
  public abstract delete(_id: string): Promise<boolean>;
}
